import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { requireAdmin, requireUser } from "@/lib/api-auth";

export async function GET() {
  const { user, response } = await requireUser();
  if (!user) return response!;

  const result = await pool.query(
    "SELECT id, plan, price, effective_date FROM company_pricing_plans ORDER BY effective_date ASC",
  );

  const plans = result.rows.map((row) => ({ ...row, price: Number(row.price) }));
  return NextResponse.json({ companyPricingPlans: plans });
}

export async function POST(request: Request) {
  const { user, response } = await requireAdmin();
  if (!user) return response!;

  const body = await request.json().catch(() => null);
  const plan = typeof body?.plan === "string" ? body.plan.trim() : "";
  const price = typeof body?.price === "number" ? body.price : Number(body?.price);
  const effectiveDate = typeof body?.effective_date === "string" ? body.effective_date : "";

  if (!plan || !Number.isFinite(price) || !effectiveDate) {
    return NextResponse.json({ error: "plan, price, and effective_date are required" }, { status: 400 });
  }

  const result = await pool.query(
    "INSERT INTO company_pricing_plans (plan, price, effective_date) VALUES ($1, $2, $3) RETURNING id, plan, price, effective_date",
    [plan, price, effectiveDate],
  );

  const row = { ...result.rows[0], price: Number(result.rows[0].price) };
  return NextResponse.json({ companyPricingPlan: row }, { status: 201 });
}
