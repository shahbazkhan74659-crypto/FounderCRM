import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSessionUser, SESSION_COOKIE_NAME } from "./auth";

export async function requireUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const user = token ? await getSessionUser(token) : null;

  if (!user) {
    return {
      user: null,
      response: NextResponse.json({ error: "Not authenticated" }, { status: 401 }),
    };
  }

  return { user, response: null };
}

export async function requireAdmin() {
  const { user, response } = await requireUser();
  if (!user) {
    return { user: null, response };
  }

  if (user.role !== "admin") {
    return {
      user: null,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { user, response: null };
}
