import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import fastifyHelmet from "@fastify/helmet";
import fastifyCors from "@fastify/cors";
import { envPluginOptions } from "./plugins/env.js";
import healthRoutes from "./routes/health.js";
import { logger, setLogLevel } from "./utils/logger.js";

export async function buildApp() {
  const app = Fastify({ logger });

  // 1. Env validation first — app must crash before any other plugin
  //    registers if a required var is missing or invalid.
  await app.register(fastifyEnv, envPluginOptions);
  setLogLevel(app.config.NODE_ENV === "development" ? "debug" : "info");

  // 2. Security headers before any routes.
  await app.register(fastifyHelmet);

  // 3. CORS scoped to FRONTEND_URL only — never a wildcard.
  await app.register(fastifyCors, {
    origin: app.config.FRONTEND_URL,
  });

  // 4. Routes
  await app.register(healthRoutes);

  // 5. Error handlers
  app.setErrorHandler((error, _request, reply) => {
    app.log.error(error);
    reply.status(500).send({
      error: "Internal Server Error",
      statusCode: 500,
      ...(app.config.NODE_ENV === "development" ? { stack: error.stack } : {}),
    });
  });

  app.setNotFoundHandler((_request, reply) => {
    reply.status(404).send({
      error: "Not Found",
      statusCode: 404,
    });
  });

  return app;
}
