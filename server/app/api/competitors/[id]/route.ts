import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { requireAdmin, requireUser } from "@/lib/api-auth";

interface RouteContext {
  params: Promise<{ id: string }>;
}

interface CompetitorRow {
  id: number;
  name: string;
  positioning: string;
  created_at: string;
  updated_at: string;
}

interface PricingHistoryRow {
  id: number;
  date: string;
  price: string;
  plan: string;
}

interface CompanyPricingPlanRow {
  plan: string;
  price: string;
  effective_date: string;
}

interface EditRequestRow {
  id: number;
  field: string;
  proposed_value: string;
  reason: string;
  status: string;
  staff_id: number;
  staff_username: string;
  resolved_by: number | null;
  resolved_at: string | null;
  created_at: string;
}

async function loadComparison() {
  const upcoming = await pool.query<CompanyPricingPlanRow>(
    `SELECT plan, price, effective_date FROM company_pricing_plans
     WHERE effective_date >= CURRENT_DATE
     ORDER BY effective_date ASC LIMIT 1`,
  );

  const row =
    upcoming.rows[0] ??
    (
      await pool.query<CompanyPricingPlanRow>(
        `SELECT plan, price, effective_date FROM company_pricing_plans
         ORDER BY effective_date DESC LIMIT 1`,
      )
    ).rows[0];

  return row ?? null;
}

function buildComparison(ourPlan: CompanyPricingPlanRow, latestHistory: PricingHistoryRow | undefined) {
  const ourPrice = Number(ourPlan.price);
  const theirLatestPrice = latestHistory ? Number(latestHistory.price) : null;
  const theirLatestDate = latestHistory ? latestHistory.date : null;

  if (theirLatestPrice === null) {
    return {
      ourPlan: ourPlan.plan,
      ourPrice,
      ourEffectiveDate: ourPlan.effective_date,
      theirLatestPrice: null,
      theirLatestDate: null,
      diff: null,
      diffLabel: "No competitor pricing history yet to compare against.",
      captionFull: `Our planned price: $${ourPrice}/mo from ${ourPlan.effective_date} — no competitor pricing history yet to compare against.`,
    };
  }

  const diff = ourPrice - theirLatestPrice;
  const diffLabel =
    diff > 0
      ? `Our planned price is $${diff} higher than their current price`
      : diff < 0
        ? `Our planned price is $${Math.abs(diff)} lower than their current price`
        : "Our planned price matches their current price";

  return {
    ourPlan: ourPlan.plan,
    ourPrice,
    ourEffectiveDate: ourPlan.effective_date,
    theirLatestPrice,
    theirLatestDate,
    diff,
    diffLabel,
    captionFull: `Our planned price: $${ourPrice}/mo from ${ourPlan.effective_date} — ${diffLabel.charAt(0).toLowerCase()}${diffLabel.slice(1)}`,
  };
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { user, response } = await requireUser();
  if (!user) return response!;

  const { id } = await params;

  const competitorResult = await pool.query<CompetitorRow>(
    "SELECT id, name, positioning, created_at, updated_at FROM competitors WHERE id = $1",
    [id],
  );
  const competitor = competitorResult.rows[0];
  if (!competitor) {
    return NextResponse.json({ error: "Competitor not found" }, { status: 404 });
  }

  const historyResult = await pool.query<PricingHistoryRow>(
    "SELECT id, date, price, plan FROM competitor_pricing_history WHERE competitor_id = $1 ORDER BY date ASC, id ASC",
    [id],
  );
  const pricingHistory = historyResult.rows.map((row) => ({
    id: row.id,
    date: row.date,
    price: Number(row.price),
    plan: row.plan,
  }));

  const ourPlan = await loadComparison();
  const comparison = ourPlan ? buildComparison(ourPlan, historyResult.rows[historyResult.rows.length - 1]) : null;

  const editRequestsResult = await pool.query<EditRequestRow>(
    `SELECT competitor_edit_requests.id, field, proposed_value, reason, status,
            staff_id, users.username AS staff_username, resolved_by, resolved_at, competitor_edit_requests.created_at
     FROM competitor_edit_requests
     JOIN users ON users.id = competitor_edit_requests.staff_id
     WHERE competitor_id = $1
     ORDER BY competitor_edit_requests.created_at DESC`,
    [id],
  );
  const editRequests = editRequestsResult.rows.map((row) => ({
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

  return NextResponse.json({
    id: competitor.id,
    name: competitor.name,
    positioning: competitor.positioning,
    createdAt: competitor.created_at,
    updatedAt: competitor.updated_at,
    pricingHistory,
    comparison,
    editRequests,
  });
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const { user, response } = await requireAdmin();
  if (!user) return response!;

  const { id } = await params;
  const body = await request.json().catch(() => null);

  const fields: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  if (typeof body?.name === "string" && body.name.trim()) {
    fields.push(`name = $${paramIndex++}`);
    values.push(body.name.trim());
  }
  if (typeof body?.positioning === "string") {
    fields.push(`positioning = $${paramIndex++}`);
    values.push(body.positioning);
  }

  if (fields.length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  fields.push("updated_at = now()");
  values.push(id);

  const result = await pool.query(
    `UPDATE competitors SET ${fields.join(", ")} WHERE id = $${paramIndex} RETURNING id, name, positioning, created_at, updated_at`,
    values,
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Competitor not found" }, { status: 404 });
  }

  return NextResponse.json({ competitor: result.rows[0] });
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { user, response } = await requireAdmin();
  if (!user) return response!;

  const { id } = await params;
  const result = await pool.query("DELETE FROM competitors WHERE id = $1", [id]);

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Competitor not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
