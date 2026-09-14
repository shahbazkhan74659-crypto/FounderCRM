import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { requireUser } from "@/lib/api-auth";

interface RouteContext {
  params: Promise<{ id: string }>;
}

const ALLOWED_FIELDS = ["pricing", "positioning"];

export async function GET(_request: Request, { params }: RouteContext) {
  const { user, response } = await requireUser();
  if (!user) return response!;

  const { id } = await params;
  const result = await pool.query(
    `SELECT competitor_edit_requests.id, field, proposed_value, reason, status,
            staff_id, users.username AS staff_username, resolved_by, resolved_at, competitor_edit_requests.created_at
     FROM competitor_edit_requests
     JOIN users ON users.id = competitor_edit_requests.staff_id
     WHERE competitor_id = $1
     ORDER BY competitor_edit_requests.created_at DESC`,
    [id],
  );

  const editRequests = result.rows.map((row) => ({
    id: row.id,
    field: row.field,
    proposedValue: row.proposed_value,
    reason: row.reason,
    status: row.status,
    staffId: row.staff_id,
    staffUsername: row.staff_username,
    resolvedBy: row.resolved_by,
    resolvedAt: row.resolved_at,
    createdAt: row.created_at,
  }));

  return NextResponse.json({ editRequests });
}

export async function POST(request: Request, { params }: RouteContext) {
  const { user, response } = await requireUser();
  if (!user) return response!;

  const { id } = await params;

  const competitorResult = await pool.query("SELECT id, name FROM competitors WHERE id = $1", [id]);
  if (competitorResult.rows.length === 0) {
    return NextResponse.json({ error: "Competitor not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const field = typeof body?.field === "string" ? body.field : "";
  const proposedValue = typeof body?.proposed_value === "string" ? body.proposed_value.trim() : "";
  const reason = typeof body?.reason === "string" ? body.reason.trim() : "";

  if (!ALLOWED_FIELDS.includes(field)) {
    return NextResponse.json({ error: "field must be 'pricing' or 'positioning'" }, { status: 400 });
  }
  if (!proposedValue || !reason) {
    return NextResponse.json({ error: "proposed_value and reason are required" }, { status: 400 });
  }

  const result = await pool.query(
    `INSERT INTO competitor_edit_requests (competitor_id, staff_id, field, proposed_value, reason)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, field, proposed_value, reason, status, staff_id, resolved_by, resolved_at, created_at`,
    [id, user.id, field, proposedValue, reason],
  );

  const row = result.rows[0];
  return NextResponse.json(
    {
      editRequest: {
        id: row.id,
        field: row.field,
        proposedValue: row.proposed_value,
        reason: row.reason,
        status: row.status,
        staffId: row.staff_id,
        staffUsername: user.username,
        resolvedBy: row.resolved_by,
        resolvedAt: row.resolved_at,
        createdAt: row.created_at,
      },
    },
    { status: 201 },
  );
}
