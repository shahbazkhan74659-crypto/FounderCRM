import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";

const ALLOWED_STATUSES = ["pending", "approved", "rejected"];

export async function GET(request: Request) {
  const { user, response } = await requireAdmin();
  if (!user) return response!;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const useFilter = status !== null && ALLOWED_STATUSES.includes(status);
  const query = `SELECT competitor_edit_requests.id, field, proposed_value, reason, status,
            staff_id, users.username AS staff_username,
            competitor_id, competitors.name AS competitor_name,
            resolved_by, resolved_at, competitor_edit_requests.created_at
     FROM competitor_edit_requests
     JOIN users ON users.id = competitor_edit_requests.staff_id
     JOIN competitors ON competitors.id = competitor_edit_requests.competitor_id
     ${useFilter ? "WHERE status = $1" : ""}
     ORDER BY competitor_edit_requests.created_at DESC`;

  const result = useFilter ? await pool.query(query, [status]) : await pool.query(query);

  const editRequests = result.rows.map((row) => ({
    id: row.id,
    field: row.field,
    proposedValue: row.proposed_value,
    reason: row.reason,
    status: row.status,
    staffId: row.staff_id,
    staffUsername: row.staff_username,
    competitorId: row.competitor_id,
    competitorName: row.competitor_name,
    resolvedBy: row.resolved_by,
    resolvedAt: row.resolved_at,
    createdAt: row.created_at,
  }));

  return NextResponse.json({ editRequests });
}
