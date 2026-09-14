import { NextResponse } from "next/server";
import { createSession, SESSION_COOKIE_NAME, verifyPassword } from "@/lib/auth";
import { pool } from "@/lib/db";

function invalidCredentialsResponse() {
  return NextResponse.json(
    { error: "Invalid username or password" },
    { status: 401 },
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body ?? {};

  if (typeof username !== "string" || typeof password !== "string" || !username || !password) {
    return NextResponse.json(
      { error: "Username and password are required" },
      { status: 400 },
    );
  }

  const result = await pool.query<{ id: number; password_hash: string }>(
    "SELECT id, password_hash FROM users WHERE username = $1",
    [username],
  );
  const user = result.rows[0];
  if (!user) {
    return invalidCredentialsResponse();
  }

  const passwordMatches = await verifyPassword(password, user.password_hash);
  if (!passwordMatches) {
    return invalidCredentialsResponse();
  }

  const { token, expiresAt } = await createSession(user.id);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
  return response;
}
