import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const { user, response } = await requireAdmin();
  if (!user) return response!;

  const { id } = await params;
  const body = await request.json().catch(() => null);

  const fields: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  if (typeof body?.plan === "string" && body.plan.trim()) {
    fields.push(`plan = $${paramIndex++}`);
    values.push(body.plan.trim());
  }
  if (body?.price !== undefined && Number.isFinite(Number(body.price))) {
    fields.push(`price = $${paramIndex++}`);
    values.push(Number(body.price));
  }
  if (typeof body?.effective_date === "string" && body.effective_date) {
    fields.push(`effective_date = $${paramIndex++}`);
    values.push(body.effective_date);
  }

  if (fields.length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  values.push(id);
  const result = await pool.query(
    `UPDATE company_pricing_plans SET ${fields.join(", ")} WHERE id = $${paramIndex} RETURNING id, plan, price, effective_date`,
    values,
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Company pricing plan not found" }, { status: 404 });
  }

  const row = { ...result.rows[0], price: Number(result.rows[0].price) };
  return NextResponse.json({ companyPricingPlan: row });
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { user, response } = await requireAdmin();
  if (!user) return response!;

  const { id } = await params;
  const result = await pool.query("DELETE FROM company_pricing_plans WHERE id = $1", [id]);

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Company pricing plan not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
