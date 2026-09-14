import { createHash, randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { pool } from "./db";

export const SESSION_COOKIE_NAME = "foundercrm_session";

const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

export function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export async function createSession(userId: number) {
  const token = randomBytes(32).toString("hex");
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await pool.query(
    "INSERT INTO sessions (token_hash, user_id, expires_at) VALUES ($1, $2, $3)",
    [tokenHash, userId, expiresAt],
  );

  return { token, expiresAt };
}
