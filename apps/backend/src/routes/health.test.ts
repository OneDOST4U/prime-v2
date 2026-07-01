import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildApp } from "../app.js";

describe("GET /health", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    process.env.NODE_ENV = "development";
    process.env.DATABASE_URL = "postgresql://user:pass@localhost:5432/db";
    process.env.SESSION_SECRET = "a".repeat(64);
    process.env.MINIO_ACCESS_KEY = "test-access-key";
    process.env.MINIO_SECRET_KEY = "test-secret-key";
    process.env.MINIO_BUCKET_NAME = "test-bucket";
    process.env.GOOGLE_CLIENT_ID = "test-client-id";
    process.env.GOOGLE_CLIENT_SECRET = "test-client-secret";
    process.env.GOOGLE_CALLBACK_URL = "http://localhost:3000/api/auth/google/callback";
    process.env.FRONTEND_URL = "http://localhost:5173";
    process.env.API_URL = "http://localhost:3000";

    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("TC-BE-01: returns HTTP 200", async () => {
    const response = await app.inject({ method: "GET", url: "/health" });
    expect(response.statusCode).toBe(200);
  });

  it("TC-BE-02: returns status ok and a valid ISO timestamp", async () => {
    const response = await app.inject({ method: "GET", url: "/health" });
    const body = response.json();
    expect(body.status).toBe("ok");
    expect(typeof body.timestamp).toBe("string");
    expect(new Date(body.timestamp).toISOString()).toBe(body.timestamp);
  });

  it("TC-BE-03: GET /nonexistent returns 404 with Not Found body", async () => {
    const response = await app.inject({ method: "GET", url: "/nonexistent" });
    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({
      error: "Not Found",
      statusCode: 404,
    });
  });
});
