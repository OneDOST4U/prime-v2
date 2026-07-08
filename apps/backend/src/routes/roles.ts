import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../db/client.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

export default async function rolesRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/api/roles",
    { preHandler: requireAuth() },
    async (_request, reply) => {
      const roles = await prisma.role.findMany({
        where: { isActive: true },
        orderBy: { code: "asc" },
      });
      return reply.status(200).send(
        roles.map((r) => ({
          id: r.id,
          code: r.code,
          name: r.name,
          description: r.description,
          isActive: r.isActive,
        })),
      );
    },
  );

  fastify.get(
    "/api/users/:id/roles",
    { preHandler: [requireAuth(), requireRole("ADMIN")] },
    async (request, reply) => {
      const params = z.object({ id: z.string().uuid() }).parse(request.params);
      const user = await prisma.user.findUnique({ where: { id: params.id } });
      if (!user) {
        return reply.status(404).send({ error: "Not Found", statusCode: 404 });
      }

      const userRoles = await prisma.userRole.findMany({
        where: { userId: params.id },
        include: { role: true },
        orderBy: { assignedAt: "asc" },
      });

      return reply.status(200).send(
        userRoles.map((ur) => ({
          id: ur.role.id,
          code: ur.role.code,
          name: ur.role.name,
          assignedAt: ur.assignedAt,
        })),
      );
    },
  );
}
