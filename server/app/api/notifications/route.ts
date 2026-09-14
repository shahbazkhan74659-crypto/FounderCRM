import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { requireUser } from "@/lib/api-auth";

export async function GET() {
  const { user, response } = await requireUser();
  if (!user) return response!;

  const result = await pool.query(
    "SELECT id, message, edit_request_id, is_read, created_at FROM notifications WHERE user_id = $1 ORDER BY created_at DESC",
    [user.id],
  );

  const notifications = result.rows.map((row) => ({
    id: row.id,
    message: row.message,
    editRequestId: row.edit_request_id,
    isRead: row.is_read,
    createdAt: row.created_at,
  }));

  return NextResponse.json({ notifications });
}
