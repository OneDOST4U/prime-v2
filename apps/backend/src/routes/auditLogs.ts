import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../db/client.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

function serializeAuditLog(log: {
  id: string;
  actorUserId: string | null;
  actorRole: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  beforeState: string | null;
  afterState: string | null;
  ipAddress: string | null;
  createdAt: Date;
  actorUser: { email: string; firstName: string; lastName: string } | null;
}) {
  return {
    id: log.id,
    actorUserId: log.actorUserId,
    actorEmail: log.actorUser?.email ?? null,
    actorName: log.actorUser
      ? `${log.actorUser.firstName} ${log.actorUser.lastName}`.trim()
      : null,
    actorRole: log.actorRole,
    action: log.action,
    entityType: log.entityType,
    entityId: log.entityId,
    beforeState: log.beforeState,
    afterState: log.afterState,
    ipAddress: log.ipAddress,
    createdAt: log.createdAt,
  };
}

export default async function auditLogsRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/api/audit-logs",
    { preHandler: [requireAuth(), requireRole("ADMIN")] },
    async (request, reply) => {
      const query = z
        .object({
          action: z.string().optional(),
          entityType: z.string().optional(),
          limit: z.coerce.number().int().min(1).max(100).optional().default(50),
          offset: z.coerce.number().int().min(0).optional().default(0),
        })
        .parse(request.query);

      const where = {
        ...(query.action ? { action: query.action } : {}),
        ...(query.entityType ? { entityType: query.entityType } : {}),
      };

      const [logs, total] = await Promise.all([
        prisma.auditLog.findMany({
          where,
          include: {
            actorUser: {
              select: { email: true, firstName: true, lastName: true },
            },
          },
          orderBy: { createdAt: "desc" },
          take: query.limit,
          skip: query.offset,
        }),
        prisma.auditLog.count({ where }),
      ]);

      return reply.status(200).send({
        total,
        limit: query.limit,
        offset: query.offset,
        items: logs.map(serializeAuditLog),
      });
    },
  );

  fastify.get(
    "/api/audit-logs/:id",
    { preHandler: [requireAuth(), requireRole("ADMIN")] },
    async (request, reply) => {
      const params = z.object({ id: z.string().uuid() }).parse(request.params);
      const log = await prisma.auditLog.findUnique({
        where: { id: params.id },
        include: {
          actorUser: {
            select: { email: true, firstName: true, lastName: true },
          },
        },
      });
      if (!log) {
        return reply.status(404).send({ error: "Not Found", statusCode: 404 });
      }
      return reply.status(200).send(serializeAuditLog(log));
    },
  );
}
