import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { requireAdmin, requireUser } from "@/lib/api-auth";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { user, response } = await requireUser();
  if (!user) return response!;

  const { id } = await params;
  const result = await pool.query(
    "SELECT id, date, price, plan FROM competitor_pricing_history WHERE competitor_id = $1 ORDER BY date ASC, id ASC",
    [id],
  );

  const entries = result.rows.map((row) => ({ ...row, price: Number(row.price) }));
  return NextResponse.json({ pricingHistory: entries });
}

export async function POST(request: Request, { params }: RouteContext) {
  const { user, response } = await requireAdmin();
  if (!user) return response!;

  const { id } = await params;

  const competitorResult = await pool.query("SELECT id FROM competitors WHERE id = $1", [id]);
  if (competitorResult.rows.length === 0) {
    return NextResponse.json({ error: "Competitor not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const date = typeof body?.date === "string" ? body.date : "";
  const price = typeof body?.price === "number" ? body.price : Number(body?.price);
  const plan = typeof body?.plan === "string" ? body.plan.trim() : "";

  if (!date || !Number.isFinite(price) || !plan) {
    return NextResponse.json({ error: "date, price, and plan are required" }, { status: 400 });
  }

  const result = await pool.query(
    "INSERT INTO competitor_pricing_history (competitor_id, date, price, plan) VALUES ($1, $2, $3, $4) RETURNING id, date, price, plan",
    [id, date, price, plan],
  );

  const entry = { ...result.rows[0], price: Number(result.rows[0].price) };
  return NextResponse.json({ pricingHistoryEntry: entry }, { status: 201 });
}
