import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../db/client.js";
import { auditLog } from "../services/auditLog.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const idParamSchema = z.object({ id: z.string().uuid() });

const createProposalTypeSchema = z.object({
  code: z.string().min(1).max(50),
  name: z.string().min(1).max(255),
  programId: z.string().uuid(),
  defaultFormTemplateId: z.string().uuid().optional(),
});

const updateProposalTypeSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  isActive: z.boolean().optional(),
  defaultFormTemplateId: z.string().uuid().nullable().optional(),
});

function serializeProposalType(pt: {
  id: string;
  code: string;
  name: string;
  programId: string;
  defaultFormTemplateId: string | null;
  isActive: boolean;
  createdAt: Date;
}) {
  return {
    id: pt.id,
    code: pt.code,
    name: pt.name,
    programId: pt.programId,
    defaultFormTemplateId: pt.defaultFormTemplateId,
    isActive: pt.isActive,
    createdAt: pt.createdAt,
  };
}

export default async function proposalTypesRoutes(fastify: FastifyInstance) {
  // GET /api/proposal-types — list proposal types
  fastify.get(
    "/api/proposal-types",
    { preHandler: requireAuth() },
    async (request, reply) => {
      const query = z
        .object({
          includeInactive: z
            .enum(["true", "false"])
            .optional()
            .transform((v) => v === "true"),
        })
        .parse(request.query);

      const types = await prisma.proposalType.findMany({
        where: query.includeInactive ? {} : { isActive: true },
        include: {
          program: { select: { id: true, code: true, name: true } },
        },
        orderBy: { createdAt: "asc" },
      });
      return reply.status(200).send(
        types.map((pt) => ({
          ...serializeProposalType(pt),
          program: pt.program,
        })),
      );
    },
  );

  // GET /api/proposal-types/:id — get single proposal type
  fastify.get(
    "/api/proposal-types/:id",
    { preHandler: requireAuth() },
    async (request, reply) => {
      const params = idParamSchema.parse(request.params);
      const proposalType = await prisma.proposalType.findUnique({
        where: { id: params.id },
      });
      if (!proposalType) {
        return reply.status(404).send({ error: "Not Found", statusCode: 404 });
      }
      return reply.status(200).send(serializeProposalType(proposalType));
    },
  );

  // GET /api/proposal-types/:id/required-forms — ordered list of forms
  // applicants must fill out for this proposal type (Phase 21C multi-form
  // linkage; separate from the single defaultFormTemplateId used to create
  // the initial ProposalVersion).
  fastify.get(
    "/api/proposal-types/:id/required-forms",
    { preHandler: requireAuth() },
    async (request, reply) => {
      const params = idParamSchema.parse(request.params);
      const proposalType = await prisma.proposalType.findUnique({
        where: { id: params.id },
      });
      if (!proposalType) {
        return reply.status(404).send({ error: "Not Found", statusCode: 404 });
      }

      const links = await prisma.proposalTypeForm.findMany({
        where: { proposalTypeId: params.id },
        include: { formTemplate: true },
        orderBy: { displayOrder: "asc" },
      });

      return reply.status(200).send(
        links.map((link) => ({
          id: link.id,
          displayOrder: link.displayOrder,
          isRequired: link.isRequired,
          formTemplate: {
            id: link.formTemplate.id,
            formCode: link.formTemplate.formCode,
            title: link.formTemplate.title,
            sourceType: link.formTemplate.sourceType,
          },
        })),
      );
    },
  );

  // POST /api/proposal-types — create (ADMIN only)
  fastify.post(
    "/api/proposal-types",
    { preHandler: [requireAuth(), requireRole("ADMIN")] },
    async (request, reply) => {
      const body = createProposalTypeSchema.parse(request.body);
      const currentUser = request.currentUser!;

      const proposalType = await prisma.proposalType.create({
        data: {
          code: body.code,
          name: body.name,
          programId: body.programId,
          defaultFormTemplateId: body.defaultFormTemplateId ?? null,
        },
      });

      await auditLog(prisma, {
        actorUserId: currentUser.id,
        actorRole: "ADMIN",
        action: "PROPOSAL_TYPE_CREATED",
        entityType: "proposal_types",
        entityId: proposalType.id,
        afterState: serializeProposalType(proposalType),
        ipAddress: request.ip,
      });

      return reply.status(201).send(serializeProposalType(proposalType));
    },
  );

  // PATCH /api/proposal-types/:id — update (ADMIN only)
  fastify.patch(
    "/api/proposal-types/:id",
    { preHandler: [requireAuth(), requireRole("ADMIN")] },
    async (request, reply) => {
      const params = idParamSchema.parse(request.params);
      const body = updateProposalTypeSchema.parse(request.body);
      const currentUser = request.currentUser!;

      const before = await prisma.proposalType.findUnique({
        where: { id: params.id },
      });
      if (!before) {
        return reply.status(404).send({ error: "Not Found", statusCode: 404 });
      }

      const updated = await prisma.proposalType.update({
        where: { id: params.id },
        data: body,
      });

      await auditLog(prisma, {
        actorUserId: currentUser.id,
        actorRole: "ADMIN",
        action: "PROPOSAL_TYPE_UPDATED",
        entityType: "proposal_types",
        entityId: updated.id,
        beforeState: serializeProposalType(before),
        afterState: serializeProposalType(updated),
        ipAddress: request.ip,
      });

      return reply.status(200).send(serializeProposalType(updated));
    },
  );
}
