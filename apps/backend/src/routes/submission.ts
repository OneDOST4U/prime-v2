import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../db/client.js";
import { requireAuth } from "../middleware/auth.js";
import { auditLog } from "../services/auditLog.js";

// ── Zod schemas ──────────────────────────────────────────────────────────────

const idParamSchema = z.object({ id: z.string().uuid() });

// Assignment gating (canAccessProposal in proposals.ts) requires an active
// ProposalAssignment row for non-ADMIN/RD roles, but nothing previously
// created one for PROJECT_FOCAL on submit — the focal queue (queueConfig.ts,
// assignmentRoleCode: "PROJECT_FOCAL") and direct proposal access both came
// back empty/403 for every focal user until this ran. Assigns every active
// PROJECT_FOCAL user so any of them can pick it up from the queue.
async function assignFocalReviewers(proposalId: string, assignedBy: string): Promise<void> {
  const focalUsers = await prisma.userRole.findMany({
    where: { role: { code: "PROJECT_FOCAL" }, user: { isActive: true } },
    select: { userId: true },
  });

  for (const { userId } of focalUsers) {
    const existing = await prisma.proposalAssignment.findFirst({
      where: { proposalId, userId, roleCode: "PROJECT_FOCAL" },
    });
    if (existing) {
      if (!existing.isActive) {
        await prisma.proposalAssignment.update({
          where: { id: existing.id },
          data: { isActive: true, assignedBy, assignedAt: new Date() },
        });
      }
    } else {
      await prisma.proposalAssignment.create({
        data: { proposalId, userId, roleCode: "PROJECT_FOCAL", assignedBy, isActive: true },
      });
    }
  }
}

// ── Route plugin ─────────────────────────────────────────────────────────────

export default async function submissionRoutes(fastify: FastifyInstance) {
  // POST /api/proposals/:id/submit — APPLICANT owner only
  fastify.post(
    "/api/proposals/:id/submit",
    { preHandler: requireAuth() },
    async (request, reply) => {
      const currentUser = request.currentUser!;
      const params = idParamSchema.parse(request.params);

      const proposal = await prisma.proposal.findUnique({
        where: { id: params.id },
        include: { currentVersion: true },
      });

      if (!proposal) {
        return reply.status(404).send({ error: "Not Found", statusCode: 404 });
      }

      // APPLICANT + owner check
      const isApplicant =
        currentUser.roles.includes("APPLICANT") &&
        currentUser.roles.every((r) => r === "APPLICANT");
      if (!isApplicant || proposal.applicantUserId !== currentUser.id) {
        return reply.status(403).send({ error: "Forbidden", statusCode: 403 });
      }

      // Status guard: must be DRAFT
      if (proposal.status !== "DRAFT") {
        return reply.status(409).send({
          error: "Conflict",
          message: "Proposal is not in DRAFT status",
        });
      }

      // Version guard: must not already be submitted
      if (!proposal.currentVersion) {
        return reply.status(400).send({ error: "Bad Request", message: "No current version" });
      }
      if (proposal.currentVersion.isSubmitted) {
        return reply.status(409).send({
          error: "Conflict",
          message: "Version already submitted",
        });
      }

      const now = new Date();

      // Update version: isSubmitted = true, submittedAt = now
      await prisma.proposalVersion.update({
        where: { id: proposal.currentVersionId! },
        data: { isSubmitted: true, submittedAt: now },
      });

      // Update proposal: status = SUBMITTED_TO_FOCAL, submittedAt = now
      const updated = await prisma.proposal.update({
        where: { id: proposal.id },
        data: { status: "SUBMITTED_TO_FOCAL", submittedAt: now },
      });

      await assignFocalReviewers(proposal.id, currentUser.id);

      // Audit log
      await auditLog(prisma, {
        actorUserId: currentUser.id,
        actorRole: currentUser.roles[0] ?? null,
        action: "PROPOSAL_SUBMITTED",
        entityType: "proposals",
        entityId: proposal.id,
        ipAddress: request.ip ?? null,
      });

      return reply.status(200).send({
        id: updated.id,
        status: updated.status,
        submittedAt: updated.submittedAt,
        currentVersionId: updated.currentVersionId,
      });
    },
  );

  // POST /api/proposals/:id/resubmit — APPLICANT owner only
  fastify.post(
    "/api/proposals/:id/resubmit",
    { preHandler: requireAuth() },
    async (request, reply) => {
      const currentUser = request.currentUser!;
      const params = idParamSchema.parse(request.params);

      const proposal = await prisma.proposal.findUnique({
        where: { id: params.id },
        include: { currentVersion: true },
      });

      if (!proposal) {
        return reply.status(404).send({ error: "Not Found", statusCode: 404 });
      }

      // APPLICANT + owner check
      const isApplicant =
        currentUser.roles.includes("APPLICANT") &&
        currentUser.roles.every((r) => r === "APPLICANT");
      if (!isApplicant || proposal.applicantUserId !== currentUser.id) {
        return reply.status(403).send({ error: "Forbidden", statusCode: 403 });
      }

      // Status guard: must be RETURNED_TO_APPLICANT
      if (proposal.status !== "RETURNED_TO_APPLICANT") {
        return reply.status(409).send({
          error: "Conflict",
          message: "Proposal is not in RETURNED_TO_APPLICANT status",
        });
      }

      if (!proposal.currentVersion) {
        return reply.status(400).send({ error: "Bad Request", message: "No current version" });
      }

      const previousVersion = proposal.currentVersion;

      // Create new version
      const newVersion = await prisma.proposalVersion.create({
        data: {
          proposalId: proposal.id,
          versionNumber: previousVersion.versionNumber + 1,
          formTemplateVersionId: previousVersion.formTemplateVersionId,
          createdBy: currentUser.id,
          isSubmitted: false,
          sourceVersionId: previousVersion.id,
          statusAtCreation: "RETURNED_TO_APPLICANT",
        },
      });

      // Update proposal: currentVersionId, status = RESUBMITTED_TO_FOCAL
      const updated = await prisma.proposal.update({
        where: { id: proposal.id },
        data: {
          currentVersionId: newVersion.id,
          status: "RESUBMITTED_TO_FOCAL",
        },
      });

      await assignFocalReviewers(proposal.id, currentUser.id);

      // Audit log
      await auditLog(prisma, {
        actorUserId: currentUser.id,
        actorRole: currentUser.roles[0] ?? null,
        action: "PROPOSAL_RESUBMITTED",
        entityType: "proposals",
        entityId: proposal.id,
        ipAddress: request.ip ?? null,
      });

      return reply.status(201).send({
        id: updated.id,
        status: updated.status,
        currentVersionId: updated.currentVersionId,
        versionNumber: newVersion.versionNumber,
      });
    },
  );
}
