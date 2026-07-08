import type { FastifyInstance } from "fastify";
import { prisma } from "../db/client.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

export default async function adminRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/api/admin/workflow-config",
    { preHandler: [requireAuth(), requireRole("ADMIN")] },
    async (_request, reply) => {
      const definitions = await prisma.workflowDefinition.findMany({
        where: { isActive: true },
        include: {
          steps: { orderBy: { statusCode: "asc" } },
          transitions: { orderBy: [{ fromStatus: "asc" }, { actionCode: "asc" }] },
        },
        orderBy: { code: "asc" },
      });

      return reply.status(200).send(
        definitions.map((d) => ({
          id: d.id,
          code: d.code,
          name: d.name,
          isActive: d.isActive,
          steps: d.steps.map((s) => ({
            id: s.id,
            statusCode: s.statusCode,
            actorRole: s.actorRole,
            description: s.description,
          })),
          transitions: d.transitions.map((t) => ({
            id: t.id,
            fromStatus: t.fromStatus,
            toStatus: t.toStatus,
            actionCode: t.actionCode,
            actorRole: t.actorRole,
          })),
        })),
      );
    },
  );

  fastify.get(
    "/api/programs",
    { preHandler: requireAuth() },
    async (_request, reply) => {
      const programs = await prisma.program.findMany({
        where: { isActive: true },
        include: { office: { select: { id: true, name: true, code: true } } },
        orderBy: { code: "asc" },
      });
      return reply.status(200).send(
        programs.map((p) => ({
          id: p.id,
          code: p.code,
          name: p.name,
          officeId: p.officeId,
          office: p.office,
          isActive: p.isActive,
        })),
      );
    },
  );

  fastify.get(
    "/api/admin/system",
    { preHandler: [requireAuth(), requireRole("ADMIN")] },
    async (_request, reply) => {
      const [
        userCount,
        activeUserCount,
        proposalCount,
        notificationCount,
        auditLogCount,
        roleCount,
        proposalTypeCount,
        formTemplateCount,
      ] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { isActive: true } }),
        prisma.proposal.count(),
        prisma.notification.count(),
        prisma.auditLog.count(),
        prisma.role.count({ where: { isActive: true } }),
        prisma.proposalType.count(),
        prisma.formTemplate.count(),
      ]);

      return reply.status(200).send({
        environment: process.env.NODE_ENV ?? "development",
        timestamp: new Date().toISOString(),
        stats: {
          users: userCount,
          activeUsers: activeUserCount,
          proposals: proposalCount,
          notifications: notificationCount,
          auditLogs: auditLogCount,
          roles: roleCount,
          proposalTypes: proposalTypeCount,
          formTemplates: formTemplateCount,
        },
      });
    },
  );
}
