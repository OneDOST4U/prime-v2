import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import type { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { buildApp } from "../app.js";
import { ROLE_CODES } from "../utils/roles.js";

// ── Mock MinIO — never call real MinIO in tests ──────────────────────────────
vi.mock("../services/minio.js", () => ({
  uploadFile: vi.fn().mockResolvedValue(undefined),
  getPresignedUrl: vi.fn().mockResolvedValue("http://minio.test/fake-presigned-url"),
}));

// ── Env setup ────────────────────────────────────────────────────────────────
const TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ??
  "postgresql://primev2_user:devpassword123@localhost:5433/primev2_test";

process.env.NODE_ENV = "development";
process.env.DATABASE_URL = TEST_DATABASE_URL;
process.env.SESSION_SECRET = "a".repeat(64);
process.env.MINIO_ENDPOINT = "localhost:9000";
process.env.MINIO_ACCESS_KEY = "test-access-key";
process.env.MINIO_SECRET_KEY = "test-secret-key";
process.env.MINIO_BUCKET_NAME = "test-bucket";
process.env.GOOGLE_CLIENT_ID = "test-client-id";
process.env.GOOGLE_CLIENT_SECRET = "test-client-secret";
process.env.GOOGLE_CALLBACK_URL = "http://localhost:3000/api/auth/google/callback";
process.env.FRONTEND_URL = "http://localhost:5173";
process.env.API_URL = "http://localhost:3000";

const db = new PrismaClient({ datasources: { db: { url: TEST_DATABASE_URL } } });

// ── Helpers ──────────────────────────────────────────────────────────────────

function sessionCookieHeader(response: { cookies: Array<{ name: string; value: string }> }) {
  const cookie = response.cookies.find((c) => c.name === "sessionId");
  return cookie ? `sessionId=${cookie.value}` : "";
}

let ipCounter = 300;
function nextIp() {
  ipCounter += 1;
  return `10.0.5.${ipCounter}`;
}

async function ensureRolesSeeded() {
  for (const code of ROLE_CODES) {
    await db.role.upsert({
      where: { code },
      update: {},
      create: { code, name: code, isActive: true },
    });
  }
}

async function createApplicantUser(email: string) {
  const applicantRole = await db.role.findUniqueOrThrow({ where: { code: "APPLICANT" } });
  const user = await db.user.create({
    data: {
      email,
      firstName: "Test",
      lastName: "Applicant",
      isActive: true,
      mustChangePassword: false,
      userRoles: { create: [{ roleId: applicantRole.id }] },
    },
  });
  await db.applicantProfile.create({
    data: {
      userId: user.id,
      privacyConsentGiven: true,
      privacyConsentAt: new Date(),
    },
  });
  return user;
}

async function loginApplicant(app: FastifyInstance, userId: string) {
  const response = await app.inject({
    method: "POST",
    url: "/api/auth/test-applicant-login",
    remoteAddress: nextIp(),
    payload: { userId },
  });
  if (response.statusCode !== 200) {
    throw new Error(
      `Failed to create applicant session for ${userId}: ${response.statusCode} ${response.body}`,
    );
  }
  return sessionCookieHeader(response);
}

/**
 * Build a multipart body for a single file upload.
 * Returns { body, boundary } to inject into Fastify.
 */
function buildMultipartBody(
  filename: string,
  content: Buffer,
  contentType: string,
): { body: Buffer; boundary: string } {
  const boundary = "----FormBoundary7MA4YWxkTrZu0gW";
  const CRLF = "\r\n";
  const header =
    `--${boundary}${CRLF}` +
    `Content-Disposition: form-data; name="file"; filename="${filename}"${CRLF}` +
    `Content-Type: ${contentType}${CRLF}${CRLF}`;
  const footer = `${CRLF}--${boundary}--${CRLF}`;
  const body = Buffer.concat([
    Buffer.from(header, "utf8"),
    content,
    Buffer.from(footer, "utf8"),
  ]);
  return { body, boundary };
}

// Minimal real PDF magic bytes (enough for file-type to detect as application/pdf)
const FAKE_PDF_MAGIC = Buffer.from("%PDF-1.4 fake content for test purposes", "utf8");
// PNG magic bytes: 8-byte PNG signature
const PNG_MAGIC = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), // PNG signature
  Buffer.from([0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52]), // IHDR chunk length + type
  Buffer.from([0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01]), // 1x1 pixel
  Buffer.from([0x08, 0x02, 0x00, 0x00, 0x00]), // bit depth=8, colorType=2 (RGB)
  Buffer.from([0x90, 0x77, 0x53, 0xde]), // CRC
  Buffer.from([0x00, 0x00, 0x00, 0x0c, 0x49, 0x44, 0x41, 0x54]), // IDAT chunk
  Buffer.from([0x08, 0xd7, 0x63, 0xf8, 0xcf, 0xc0, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01]),
  Buffer.from([0xe2, 0x21, 0xbc, 0x33]), // CRC
  Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82]), // IEND
]);

// ── Test data identifiers for cleanup ────────────────────────────────────────
const TEST_EMAILS = [
  "attach-owner@test.local",
  "attach-other@test.local",
];

const TEST_PROPOSAL_TYPE_CODE = "PT-ATTACH-TEST-01";
const TEST_OFFICE_CODE = "OFFICE-ATTACH-TEST-01";
const TEST_PROGRAM_CODE = "PROG-ATTACH-TEST-01";
const TEST_FORM_CODE = "FT-ATTACH-TEST-01";

async function cleanupTestData() {
  const proposalType = await db.proposalType.findUnique({
    where: { code: TEST_PROPOSAL_TYPE_CODE },
  });
  if (proposalType) {
    const proposals = await db.proposal.findMany({
      where: { proposalTypeId: proposalType.id },
    });
    const proposalIds = proposals.map((p) => p.id);

    if (proposalIds.length > 0) {
      const versions = await db.proposalVersion.findMany({
        where: { proposalId: { in: proposalIds } },
      });
      const versionIds = versions.map((v) => v.id);

      if (versionIds.length > 0) {
        await db.proposalAttachment.deleteMany({
          where: { proposalVersionId: { in: versionIds } },
        });
        await db.proposalFieldValue.deleteMany({
          where: { proposalVersionId: { in: versionIds } },
        });
      }

      await db.proposal.updateMany({
        where: { id: { in: proposalIds } },
        data: { currentVersionId: null },
      });

      await db.proposalVersion.deleteMany({
        where: { proposalId: { in: proposalIds } },
      });
      await db.proposal.deleteMany({ where: { id: { in: proposalIds } } });
    }

    await db.proposalType.update({
      where: { id: proposalType.id },
      data: { defaultFormTemplateId: null },
    });
    await db.proposalType.delete({ where: { id: proposalType.id } });
  }

  const formTemplate = await db.formTemplate.findUnique({
    where: { formCode: TEST_FORM_CODE },
  });
  if (formTemplate) {
    const versions = await db.formTemplateVersion.findMany({
      where: { formTemplateId: formTemplate.id },
    });
    const versionIds = versions.map((v) => v.id);
    if (versionIds.length > 0) {
      const sections = await db.formSection.findMany({
        where: { formTemplateVersionId: { in: versionIds } },
      });
      const sectionIds = sections.map((s) => s.id);
      if (sectionIds.length > 0) {
        await db.formField.deleteMany({ where: { formSectionId: { in: sectionIds } } });
        await db.formSection.deleteMany({ where: { id: { in: sectionIds } } });
      }
      await db.formTemplateVersion.deleteMany({ where: { id: { in: versionIds } } });
    }
    await db.formTemplate.delete({ where: { id: formTemplate.id } });
  }

  const program = await db.program.findUnique({ where: { code: TEST_PROGRAM_CODE } });
  if (program) {
    await db.program.delete({ where: { id: program.id } });
  }
  const office = await db.office.findUnique({ where: { code: TEST_OFFICE_CODE } });
  if (office) {
    await db.office.delete({ where: { id: office.id } });
  }

  const users = await db.user.findMany({ where: { email: { in: TEST_EMAILS } } });
  const userIds = users.map((u) => u.id);
  if (userIds.length > 0) {
    await db.auditLog.deleteMany({ where: { actorUserId: { in: userIds } } });
    await db.userRole.deleteMany({ where: { userId: { in: userIds } } });
    await db.applicantProfile.deleteMany({ where: { userId: { in: userIds } } });
    await db.user.deleteMany({ where: { id: { in: userIds } } });
  }
}

// ── Test suite ────────────────────────────────────────────────────────────────

describe("Attachments routes", () => {
  let app: FastifyInstance;
  let proposalTypeId: string;
  let ownerUserId: string;
  let otherUserId: string;

  // Shared proposal + version created in beforeAll for TC-FILE-04/05/06
  let sharedProposalId: string;
  let sharedVersionId: string;

  beforeAll(async () => {
    await ensureRolesSeeded();
    await cleanupTestData();

    // Build app — fastifyMultipart is now registered inside buildApp() (Task 7)
    app = await buildApp();
    await app.ready();

    // ── Seed office + program ──────────────────────────────────────────────
    const office = await db.office.create({
      data: { code: TEST_OFFICE_CODE, name: "Test Office (Attachments)" },
    });
    const program = await db.program.create({
      data: {
        code: TEST_PROGRAM_CODE,
        name: "Test Program (Attachments)",
        officeId: office.id,
      },
    });

    // ── Seed FormTemplate ──────────────────────────────────────────────────
    const formTemplate = await db.formTemplate.create({
      data: { formCode: TEST_FORM_CODE, title: "Test Attachment Form", isActive: true },
    });
    const formVersion = await db.formTemplateVersion.create({
      data: {
        formTemplateId: formTemplate.id,
        versionNumber: 1,
        schemaVersion: "1.0",
        isCurrent: true,
        publishedAt: new Date(),
      },
    });
    const section = await db.formSection.create({
      data: {
        formTemplateVersionId: formVersion.id,
        sectionCode: "S1",
        title: "Project Details",
        displayOrder: 1,
        isRepeating: false,
        isRequired: true,
      },
    });
    await db.formField.create({
      data: {
        formSectionId: section.id,
        fieldCode: "F1",
        label: "Project Title",
        inputType: "TEXT",
        isRequired: true,
        displayOrder: 1,
      },
    });

    // ── Seed ProposalType ──────────────────────────────────────────────────
    const proposalType = await db.proposalType.create({
      data: {
        code: TEST_PROPOSAL_TYPE_CODE,
        name: "Test Attachment Grant",
        programId: program.id,
        defaultFormTemplateId: formTemplate.id,
        isActive: true,
      },
    });
    proposalTypeId = proposalType.id;

    // ── Seed users ─────────────────────────────────────────────────────────
    const owner = await createApplicantUser("attach-owner@test.local");
    ownerUserId = owner.id;

    const other = await createApplicantUser("attach-other@test.local");
    otherUserId = other.id;

    // ── Seed shared proposal (owner) for download/list tests ──────────────
    const ownerCookie = await loginApplicant(app, ownerUserId);
    const createResp = await app.inject({
      method: "POST",
      url: "/api/proposals",
      headers: { cookie: ownerCookie },
      payload: { proposalTypeId, title: "Shared Proposal for Attachments" },
    });
    const created = createResp.json() as { id: string; currentVersionId: string };
    sharedProposalId = created.id;
    sharedVersionId = created.currentVersionId;

    // Pre-seed one attachment record in DB (bypassing MinIO) for download tests
    await db.proposalAttachment.create({
      data: {
        proposalId: sharedProposalId,
        proposalVersionId: sharedVersionId,
        minioKey: `${sharedProposalId}/${sharedVersionId}/seeded-attachment.pdf`,
        originalFilename: "seeded-document.pdf",
        contentType: "application/pdf",
        sizeBytes: 12345,
        uploadedBy: ownerUserId,
      },
    });
  });

  afterAll(async () => {
    await app.close();
    await cleanupTestData();
    await db.$disconnect();
  });

  // ── TC-FILE-01 ─────────────────────────────────────────────────────────────
  it("TC-FILE-01: POST attachment with allowed MIME (PDF) stores in MinIO and returns 201 with metadata", async () => {
    const { uploadFile } = await import("../services/minio.js");
    const ownerCookie = await loginApplicant(app, ownerUserId);

    // Create a fresh proposal for this test
    const createResp = await app.inject({
      method: "POST",
      url: "/api/proposals",
      headers: { cookie: ownerCookie },
      payload: { proposalTypeId, title: "TC-FILE-01 Proposal" },
    });
    expect(createResp.statusCode).toBe(201);
    const { id: proposalId } = createResp.json() as { id: string };

    const { body, boundary } = buildMultipartBody(
      "test-document.pdf",
      FAKE_PDF_MAGIC,
      "application/pdf",
    );

    const response = await app.inject({
      method: "POST",
      url: `/api/proposals/${proposalId}/attachments`,
      headers: {
        cookie: ownerCookie,
        "content-type": `multipart/form-data; boundary=${boundary}`,
      },
      body,
    });

    expect(response.statusCode).toBe(201);
    const respBody = response.json() as {
      id: string;
      originalFilename: string;
      contentType: string;
      sizeBytes: number;
      uploadedAt: string;
    };
    expect(respBody.id).toBeDefined();
    expect(respBody.originalFilename).toBe("test-document.pdf");
    expect(respBody.contentType).toBe("application/pdf");
    expect(respBody.sizeBytes).toBe(FAKE_PDF_MAGIC.length);
    expect(typeof respBody.uploadedAt).toBe("string");

    // Verify MinIO upload was called
    expect(uploadFile).toHaveBeenCalledOnce();
  });

  // ── TC-FILE-02 ─────────────────────────────────────────────────────────────
  it("TC-FILE-02: POST attachment with .exe extension → 400", async () => {
    const ownerCookie = await loginApplicant(app, ownerUserId);

    const createResp = await app.inject({
      method: "POST",
      url: "/api/proposals",
      headers: { cookie: ownerCookie },
      payload: { proposalTypeId, title: "TC-FILE-02 Proposal" },
    });
    expect(createResp.statusCode).toBe(201);
    const { id: proposalId } = createResp.json() as { id: string };

    const exeContent = Buffer.from("MZfake exe content", "utf8");
    const { body, boundary } = buildMultipartBody(
      "malware.exe",
      exeContent,
      "application/octet-stream",
    );

    const response = await app.inject({
      method: "POST",
      url: `/api/proposals/${proposalId}/attachments`,
      headers: {
        cookie: ownerCookie,
        "content-type": `multipart/form-data; boundary=${boundary}`,
      },
      body,
    });

    expect(response.statusCode).toBe(400);
    const respBody = response.json() as { error: string };
    expect(respBody.error).toBe("File type not allowed");
  });

  // ── TC-FILE-03 ─────────────────────────────────────────────────────────────
  it("TC-FILE-03: POST attachment exceeding 50MB → 400", async () => {
    const ownerCookie = await loginApplicant(app, ownerUserId);

    const createResp = await app.inject({
      method: "POST",
      url: "/api/proposals",
      headers: { cookie: ownerCookie },
      payload: { proposalTypeId, title: "TC-FILE-03 Proposal" },
    });
    expect(createResp.statusCode).toBe(201);
    const { id: proposalId } = createResp.json() as { id: string };

    // Build a buffer > 50MB with valid PDF magic bytes at the start
    const oversizeBuffer = Buffer.concat([
      FAKE_PDF_MAGIC,
      Buffer.alloc(52428800 + 1 - FAKE_PDF_MAGIC.length, 0x41), // fill with 'A'
    ]);

    const { body, boundary } = buildMultipartBody(
      "huge-document.pdf",
      oversizeBuffer,
      "application/pdf",
    );

    const response = await app.inject({
      method: "POST",
      url: `/api/proposals/${proposalId}/attachments`,
      headers: {
        cookie: ownerCookie,
        "content-type": `multipart/form-data; boundary=${boundary}`,
      },
      body,
    });

    expect(response.statusCode).toBe(400);
    const respBody = response.json() as { error: string };
    expect(respBody.error).toBe("File too large (max 50MB)");
  });

  // ── TC-FILE-04 ─────────────────────────────────────────────────────────────
  it("TC-FILE-04: GET attachment/download returns { url } where url starts with 'http'", async () => {
    const ownerCookie = await loginApplicant(app, ownerUserId);

    // Get the list to find the seeded attachment id
    const listResp = await app.inject({
      method: "GET",
      url: `/api/proposals/${sharedProposalId}/attachments`,
      headers: { cookie: ownerCookie },
    });
    expect(listResp.statusCode).toBe(200);
    const attachments = listResp.json() as Array<{ id: string }>;
    expect(attachments.length).toBeGreaterThan(0);

    const attachmentId = attachments[0].id;

    const downloadResp = await app.inject({
      method: "GET",
      url: `/api/proposals/${sharedProposalId}/attachments/${attachmentId}/download`,
      headers: { cookie: ownerCookie },
    });

    expect(downloadResp.statusCode).toBe(200);
    const body = downloadResp.json() as { url: string };
    expect(typeof body.url).toBe("string");
    expect(body.url).toMatch(/^http/);
  });

  // ── TC-FILE-05 ─────────────────────────────────────────────────────────────
  it("TC-FILE-05: GET attachment/download as a different applicant (not owner, not assigned, not admin) → 403", async () => {
    const otherCookie = await loginApplicant(app, otherUserId);

    // Get attachment list using shared proposal id — other applicant should get 403 here too
    const listResp = await app.inject({
      method: "GET",
      url: `/api/proposals/${sharedProposalId}/attachments`,
      headers: { cookie: otherCookie },
    });
    expect(listResp.statusCode).toBe(403);

    // Also try download directly with a known attachment id
    const ownerCookie = await loginApplicant(app, ownerUserId);
    const ownerList = await app.inject({
      method: "GET",
      url: `/api/proposals/${sharedProposalId}/attachments`,
      headers: { cookie: ownerCookie },
    });
    const attachments = ownerList.json() as Array<{ id: string }>;
    const attachmentId = attachments[0].id;

    const downloadResp = await app.inject({
      method: "GET",
      url: `/api/proposals/${sharedProposalId}/attachments/${attachmentId}/download`,
      headers: { cookie: otherCookie },
    });
    expect(downloadResp.statusCode).toBe(403);
  });

  // ── TC-FILE-06 ─────────────────────────────────────────────────────────────
  it("TC-FILE-06: Upload and download operations both insert rows in audit_logs", async () => {
    const { uploadFile } = await import("../services/minio.js");
    vi.mocked(uploadFile).mockClear();

    const ownerCookie = await loginApplicant(app, ownerUserId);

    // Upload
    const createResp = await app.inject({
      method: "POST",
      url: "/api/proposals",
      headers: { cookie: ownerCookie },
      payload: { proposalTypeId, title: "TC-FILE-06 Proposal" },
    });
    expect(createResp.statusCode).toBe(201);
    const { id: proposalId } = createResp.json() as { id: string };

    const { body: uploadBody, boundary } = buildMultipartBody(
      "audit-test.pdf",
      FAKE_PDF_MAGIC,
      "application/pdf",
    );

    const uploadResp = await app.inject({
      method: "POST",
      url: `/api/proposals/${proposalId}/attachments`,
      headers: {
        cookie: ownerCookie,
        "content-type": `multipart/form-data; boundary=${boundary}`,
      },
      body: uploadBody,
    });
    expect(uploadResp.statusCode).toBe(201);
    const uploadedAttachment = uploadResp.json() as { id: string };

    // Verify ATTACHMENT_UPLOADED audit log row
    const uploadLog = await db.auditLog.findFirst({
      where: {
        action: "ATTACHMENT_UPLOADED",
        entityType: "proposal_attachments",
        entityId: uploadedAttachment.id,
        actorUserId: ownerUserId,
      },
    });
    expect(uploadLog).not.toBeNull();

    // Download
    const downloadResp = await app.inject({
      method: "GET",
      url: `/api/proposals/${proposalId}/attachments/${uploadedAttachment.id}/download`,
      headers: { cookie: ownerCookie },
    });
    expect(downloadResp.statusCode).toBe(200);

    // Verify ATTACHMENT_DOWNLOADED audit log row
    const downloadLog = await db.auditLog.findFirst({
      where: {
        action: "ATTACHMENT_DOWNLOADED",
        entityType: "proposal_attachments",
        entityId: uploadedAttachment.id,
        actorUserId: ownerUserId,
      },
    });
    expect(downloadLog).not.toBeNull();
  });
});
