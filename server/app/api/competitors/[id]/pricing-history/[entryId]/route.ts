import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";

interface RouteContext {
  params: Promise<{ id: string; entryId: string }>;
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const { user, response } = await requireAdmin();
  if (!user) return response!;

  const { id, entryId } = await params;
  const body = await request.json().catch(() => null);

  const fields: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  if (typeof body?.date === "string" && body.date) {
    fields.push(`date = $${paramIndex++}`);
    values.push(body.date);
  }
  if (body?.price !== undefined && Number.isFinite(Number(body.price))) {
    fields.push(`price = $${paramIndex++}`);
    values.push(Number(body.price));
  }
  if (typeof body?.plan === "string" && body.plan.trim()) {
    fields.push(`plan = $${paramIndex++}`);
    values.push(body.plan.trim());
  }

  if (fields.length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  values.push(entryId, id);
  const result = await pool.query(
    `UPDATE competitor_pricing_history SET ${fields.join(", ")}
     WHERE id = $${paramIndex} AND competitor_id = $${paramIndex + 1}
     RETURNING id, date, price, plan`,
    values,
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Pricing history entry not found" }, { status: 404 });
  }

  const entry = { ...result.rows[0], price: Number(result.rows[0].price) };
  return NextResponse.json({ pricingHistoryEntry: entry });
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { user, response } = await requireAdmin();
  if (!user) return response!;

  const { id, entryId } = await params;
  const result = await pool.query(
    "DELETE FROM competitor_pricing_history WHERE id = $1 AND competitor_id = $2",
    [entryId, id],
  );

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Pricing history entry not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
