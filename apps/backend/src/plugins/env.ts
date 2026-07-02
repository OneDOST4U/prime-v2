import type { FastifyEnvOptions } from "@fastify/env";

export interface EnvConfig {
  NODE_ENV: "development" | "staging" | "production";
  DATABASE_URL: string;
  SESSION_SECRET: string;
  MINIO_ACCESS_KEY: string;
  MINIO_SECRET_KEY: string;
  MINIO_BUCKET_NAME: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
  FRONTEND_URL: string;
  API_URL: string;
  PORT: number;
}

declare module "fastify" {
  interface FastifyInstance {
    config: EnvConfig;
  }
}

const schema = {
  type: "object",
  required: [
    "NODE_ENV",
    "DATABASE_URL",
    "SESSION_SECRET",
    "MINIO_ACCESS_KEY",
    "MINIO_SECRET_KEY",
    "MINIO_BUCKET_NAME",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CALLBACK_URL",
    "FRONTEND_URL",
    "API_URL",
  ],
  properties: {
    NODE_ENV: {
      type: "string",
      enum: ["development", "staging", "production"],
    },
    DATABASE_URL: { type: "string", minLength: 1 },
    SESSION_SECRET: { type: "string", minLength: 64 },
    MINIO_ACCESS_KEY: { type: "string", minLength: 1 },
    MINIO_SECRET_KEY: { type: "string", minLength: 1 },
    MINIO_BUCKET_NAME: { type: "string", minLength: 1 },
    GOOGLE_CLIENT_ID: { type: "string", minLength: 1 },
    GOOGLE_CLIENT_SECRET: { type: "string", minLength: 1 },
    GOOGLE_CALLBACK_URL: { type: "string", minLength: 1 },
    FRONTEND_URL: { type: "string", minLength: 1 },
    API_URL: { type: "string", minLength: 1 },
    PORT: { type: "number", default: 3000 },
  },
};

// Consumed directly by app.ts via fastify.register(fastifyEnv, envPluginOptions).
// Kept as plain options (not a wrapped plugin) so the `config` decorator lands
// on the root Fastify instance instead of a child encapsulation context.
export const envPluginOptions: FastifyEnvOptions = {
  schema,
  dotenv: true,
  confKey: "config",
};
