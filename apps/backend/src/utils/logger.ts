import pino from "pino";

const REDACT_PATHS = [
  "DATABASE_URL",
  "SESSION_SECRET",
  "MINIO_SECRET_KEY",
  "GOOGLE_CLIENT_SECRET",
  "req.headers.authorization",
  "req.headers.cookie",
];

export const logger = pino({
  level: "info",
  redact: {
    paths: REDACT_PATHS,
    censor: "[REDACTED]",
  },
});

export function setLogLevel(level: string) {
  logger.level = level;
}
