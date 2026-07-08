import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../db/client.js";
import { requireAuth } from "../middleware/auth.js";

const idParamSchema = z.object({ id: z.string().uuid() });

function serializeNotification(n: {
  id: string;
  proposalId: string | null;
  eventType: string;
  message: string;
  isRead: boolean;
  readAt: Date | null;
  createdAt: Date;
}) {
  return {
    id: n.id,
    proposalId: n.proposalId,
    eventType: n.eventType,
    message: n.message,
    isRead: n.isRead,
    readAt: n.readAt,
    createdAt: n.createdAt,
  };
}

export default async function notificationsRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/api/notifications",
    { preHandler: requireAuth() },
    async (request, reply) => {
      const currentUser = request.currentUser!;
      const query = z
        .object({
          unreadOnly: z
            .enum(["true", "false"])
            .optional()
            .transform((v) => v === "true"),
          limit: z.coerce.number().int().min(1).max(100).optional().default(50),
        })
        .parse(request.query);

      const notifications = await prisma.notification.findMany({
        where: {
          recipientUserId: currentUser.id,
          ...(query.unreadOnly ? { isRead: false } : {}),
        },
        orderBy: { createdAt: "desc" },
        take: query.limit,
      });

      return reply.status(200).send(notifications.map(serializeNotification));
    },
  );

  fastify.get(
    "/api/notifications/unread-count",
    { preHandler: requireAuth() },
    async (request, reply) => {
      const currentUser = request.currentUser!;
      const count = await prisma.notification.count({
        where: { recipientUserId: currentUser.id, isRead: false },
      });
      return reply.status(200).send({ count });
    },
  );

  fastify.post(
    "/api/notifications/:id/read",
    { preHandler: requireAuth() },
    async (request, reply) => {
      const currentUser = request.currentUser!;
      const params = idParamSchema.parse(request.params);

      const notification = await prisma.notification.findFirst({
        where: { id: params.id, recipientUserId: currentUser.id },
      });
      if (!notification) {
        return reply.status(404).send({ error: "Not Found", statusCode: 404 });
      }

      const updated = await prisma.notification.update({
        where: { id: params.id },
        data: { isRead: true, readAt: new Date() },
      });

      return reply.status(200).send(serializeNotification(updated));
    },
  );

  fastify.post(
    "/api/notifications/read-all",
    { preHandler: requireAuth() },
    async (request, reply) => {
      const currentUser = request.currentUser!;
      const result = await prisma.notification.updateMany({
        where: { recipientUserId: currentUser.id, isRead: false },
        data: { isRead: true, readAt: new Date() },
      });
      return reply.status(200).send({ updated: result.count });
    },
  );
}
