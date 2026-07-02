import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { buildApp } from "../app.js";
import { ROLE_CODES } from "../utils/roles.js";

const TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ??
  "postgresql://primev2_user:devpassword123@localhost:5433/primev2_test";

process.env.NODE_ENV = "development";
process.env.DATABASE_URL = TEST_DATABASE_URL;
process.env.SESSION_SECRET = "a".repeat(64);
process.env.MINIO_ACCESS_KEY = "test-access-key";
process.env.MINIO_SECRET_KEY = "test-secret-key";
process.env.MINIO_BUCKET_NAME = "test-bucket";
process.env.GOOGLE_CLIENT_ID = "test-client-id";
process.env.GOOGLE_CLIENT_SECRET = "test-client-secret";
process.env.GOOGLE_CALLBACK_URL = "http://localhost:3000/api/auth/google/callback";
process.env.FRONTEND_URL = "http://localhost:5173";
process.env.API_URL = "http://localhost:3000";

const db = new PrismaClient({ datasources: { db: { url: TEST_DATABASE_URL } } });

function sessionCookieHeader(response: { cookies: Array<{ name: string; value: string }> }) {
  const cookie = response.cookies.find((c) => c.name === "sessionId");
  return cookie ? `sessionId=${cookie.value}` : "";
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

let ipCounter = 200;
function nextIp() {
  ipCounter += 1;
  return `10.0.2.${ipCounter}`;
}

async function createAdminSession(app: FastifyInstance, email: string) {
  const passwordHash = await bcrypt.hash("AdminPassw0rd!", 12);
  const adminRole = await db.role.findUniqueOrThrow({ where: { code: "ADMIN" } });
  await db.user.create({
    data: {
      email,
      passwordHash,
      firstName: "Admin",
      lastName: "User",
      isActive: true,
      mustChangePassword: false,
      userRoles: { create: [{ roleId: adminRole.id }] },
    },
  });

  const loginResponse = await app.inject({
    method: "POST",
    url: "/api/auth/staff/login",
    remoteAddress: nextIp(),
    payload: { email, password: "AdminPassw0rd!" },
  });
  return sessionCookieHeader(loginResponse);
}

async function createNonAdminSession(app: FastifyInstance, email: string) {
  const passwordHash = await bcrypt.hash("FocalPassw0rd!", 12);
  const focalRole = await db.role.findUniqueOrThrow({ where: { code: "PROJECT_FOCAL" } });
  await db.user.create({
    data: {
      email,
      passwordHash,
      firstName: "Focal",
      lastName: "User",
      isActive: true,
      mustChangePassword: false,
      userRoles: { create: [{ roleId: focalRole.id }] },
    },
  });

  const loginResponse = await app.inject({
    method: "POST",
    url: "/api/auth/staff/login",
    remoteAddress: nextIp(),
    payload: { email, password: "FocalPassw0rd!" },
  });
  return sessionCookieHeader(loginResponse);
}

async function seedOfficeAndProgram(suffix: string) {
  const office = await db.office.create({
    data: {
      name: `Test Office ${suffix}`,
      code: `OFF-${suffix}`,
      isActive: true,
    },
  });
  const program = await db.program.create({
    data: {
      name: `Test Program ${suffix}`,
      code: `PRG-${suffix}`,
      officeId: office.id,
      isActive: true,
    },
  });
  return { office, program };
}

const TEST_EMAILS = [
  "admin-list-types@test.local",
  "admin-get-type@test.local",
  "admin-get-404@test.local",
  "admin-create-type@test.local",
  "applicant-post-type@test.local",
  "admin-patch-type@test.local",
];

const TEST_TYPE_CODES = [
  "TYPE-ACTIVE-01",
  "TYPE-INACTIVE-01",
  "TYPE-GET-02",
  "TYPE-POST-01",
  "TYPE-PATCH-01",
];

const TEST_OFFICE_CODES = ["OFF-LIST01", "OFF-GET02", "OFF-POST01", "OFF-POST02", "OFF-PATCH01"];

async function cleanupTestData() {
  // Remove proposal types created by tests
  await db.proposalType.deleteMany({ where: { code: { in: TEST_TYPE_CODES } } });

  // Remove form templates created by tests
  await db.formTemplate.deleteMany({ where: { formCode: "FT-GET02" } });

  // Remove programs and offices created by tests
  await db.program.deleteMany({
    where: { code: { in: ["PRG-LIST01", "PRG-GET02", "PRG-POST01", "PRG-POST02", "PRG-PATCH01"] } },
  });
  await db.office.deleteMany({ where: { code: { in: TEST_OFFICE_CODES } } });

  // Remove users (cascades UserRole, AuditLog, StaffProfile, ApplicantProfile)
  // Must delete in dependency order
  const users = await db.user.findMany({ where: { email: { in: TEST_EMAILS } } });
  const userIds = users.map((u) => u.id);
  if (userIds.length > 0) {
    await db.auditLog.deleteMany({ where: { actorUserId: { in: userIds } } });
    await db.userRole.deleteMany({ where: { userId: { in: userIds } } });
    await db.staffProfile.deleteMany({ where: { userId: { in: userIds } } });
    await db.applicantProfile.deleteMany({ where: { userId: { in: userIds } } });
    await db.userInvitation.deleteMany({ where: { userId: { in: userIds } } });
    await db.user.deleteMany({ where: { id: { in: userIds } } });
  }
}

describe("Proposal Types routes", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    await ensureRolesSeeded();
    await cleanupTestData();
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
    await db.$disconnect();
  });

  it("TC-GET-TYPES-01: GET /api/proposal-types returns only active types", async () => {
    const adminCookie = await createAdminSession(app, "admin-list-types@test.local");
    const { program } = await seedOfficeAndProgram("LIST01");

    // Create 1 active and 1 inactive proposal type
    await db.proposalType.create({
      data: {
        code: "TYPE-ACTIVE-01",
        name: "Active Proposal Type",
        programId: program.id,
        isActive: true,
      },
    });
    await db.proposalType.create({
      data: {
        code: "TYPE-INACTIVE-01",
        name: "Inactive Proposal Type",
        programId: program.id,
        isActive: false,
      },
    });

    const response = await app.inject({
      method: "GET",
      url: "/api/proposal-types",
      headers: { cookie: adminCookie },
    });

    expect(response.statusCode).toBe(200);
    const body = response.json() as Array<{ code: string; isActive: boolean }>;
    const codes = body.map((t) => t.code);
    expect(codes).toContain("TYPE-ACTIVE-01");
    expect(codes).not.toContain("TYPE-INACTIVE-01");
    expect(body.every((t) => t.isActive === true)).toBe(true);
  });

  it("TC-GET-TYPES-02: GET /api/proposal-types/:id returns type with defaultFormTemplateId", async () => {
    const adminCookie = await createAdminSession(app, "admin-get-type@test.local");
    const { program } = await seedOfficeAndProgram("GET02");

    // Create a form template to link
    const formTemplate = await db.formTemplate.create({
      data: {
        formCode: "FT-GET02",
        title: "Test Form Template GET02",
        isActive: true,
      },
    });

    const proposalType = await db.proposalType.create({
      data: {
        code: "TYPE-GET-02",
        name: "Get Test Type",
        programId: program.id,
        defaultFormTemplateId: formTemplate.id,
        isActive: true,
      },
    });

    const response = await app.inject({
      method: "GET",
      url: `/api/proposal-types/${proposalType.id}`,
      headers: { cookie: adminCookie },
    });

    expect(response.statusCode).toBe(200);
    const body = response.json() as {
      id: string;
      code: string;
      defaultFormTemplateId: string;
    };
    expect(body.id).toBe(proposalType.id);
    expect(body.code).toBe("TYPE-GET-02");
    expect(body.defaultFormTemplateId).toBe(formTemplate.id);
  });

  it("TC-GET-TYPES-02b: GET /api/proposal-types/:id returns 404 for unknown id", async () => {
    const adminCookie = await createAdminSession(app, "admin-get-404@test.local");

    const response = await app.inject({
      method: "GET",
      url: "/api/proposal-types/00000000-0000-0000-0000-000000000000",
      headers: { cookie: adminCookie },
    });

    expect(response.statusCode).toBe(404);
  });

  it("TC-POST-TYPE-01: POST /api/proposal-types as ADMIN creates type → 201", async () => {
    const adminCookie = await createAdminSession(app, "admin-create-type@test.local");
    const { program } = await seedOfficeAndProgram("POST01");

    const response = await app.inject({
      method: "POST",
      url: "/api/proposal-types",
      headers: { cookie: adminCookie },
      payload: {
        code: "TYPE-POST-01",
        name: "Created Proposal Type",
        programId: program.id,
      },
    });

    expect(response.statusCode).toBe(201);
    const body = response.json() as {
      id: string;
      code: string;
      name: string;
      programId: string;
      isActive: boolean;
    };
    expect(body.code).toBe("TYPE-POST-01");
    expect(body.name).toBe("Created Proposal Type");
    expect(body.programId).toBe(program.id);
    expect(body.isActive).toBe(true);

    // Verify in DB
    const created = await db.proposalType.findUniqueOrThrow({ where: { id: body.id } });
    expect(created.code).toBe("TYPE-POST-01");

    // Verify audit log
    const auditRow = await db.auditLog.findFirst({
      where: { action: "PROPOSAL_TYPE_CREATED", entityId: body.id },
    });
    expect(auditRow).not.toBeNull();
  });

  it("TC-POST-TYPE-02: POST /api/proposal-types as non-ADMIN returns 403", async () => {
    const nonAdminCookie = await createNonAdminSession(app, "applicant-post-type@test.local");
    const { program } = await seedOfficeAndProgram("POST02");

    const response = await app.inject({
      method: "POST",
      url: "/api/proposal-types",
      headers: { cookie: nonAdminCookie },
      payload: {
        code: "TYPE-POST-02",
        name: "Should Not Be Created",
        programId: program.id,
      },
    });

    expect(response.statusCode).toBe(403);
  });

  it("TC-PATCH-TYPE-01: PATCH /api/proposal-types/:id as ADMIN updates fields → 200", async () => {
    const adminCookie = await createAdminSession(app, "admin-patch-type@test.local");
    const { program } = await seedOfficeAndProgram("PATCH01");

    const proposalType = await db.proposalType.create({
      data: {
        code: "TYPE-PATCH-01",
        name: "Original Name",
        programId: program.id,
        isActive: true,
      },
    });

    const response = await app.inject({
      method: "PATCH",
      url: `/api/proposal-types/${proposalType.id}`,
      headers: { cookie: adminCookie },
      payload: {
        name: "Updated Name",
        isActive: false,
      },
    });

    expect(response.statusCode).toBe(200);
    const body = response.json() as { name: string; isActive: boolean };
    expect(body.name).toBe("Updated Name");
    expect(body.isActive).toBe(false);

    // Verify in DB
    const updated = await db.proposalType.findUniqueOrThrow({
      where: { id: proposalType.id },
    });
    expect(updated.name).toBe("Updated Name");
    expect(updated.isActive).toBe(false);

    // Verify audit log
    const auditRow = await db.auditLog.findFirst({
      where: { action: "PROPOSAL_TYPE_UPDATED", entityId: proposalType.id },
    });
    expect(auditRow).not.toBeNull();
  });

  it("TC-AUTH-REQUIRED: GET /api/proposal-types without auth returns 401", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/proposal-types",
    });
    expect(response.statusCode).toBe(401);
  });
});
