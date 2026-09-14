import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { requireAdmin, requireUser } from "@/lib/api-auth";

interface CompetitorListRow {
  id: number;
  name: string;
  positioning: string;
  latest_price: string | null;
  latest_plan: string | null;
  latest_date: string | null;
}

export async function GET() {
  const { user, response } = await requireUser();
  if (!user) return response!;

  const result = await pool.query<CompetitorListRow>(
    `SELECT
       competitors.id,
       competitors.name,
       competitors.positioning,
       latest.price AS latest_price,
       latest.plan AS latest_plan,
       latest.date AS latest_date
     FROM competitors
     LEFT JOIN LATERAL (
       SELECT price, plan, date
       FROM competitor_pricing_history
       WHERE competitor_pricing_history.competitor_id = competitors.id
       ORDER BY date DESC, id DESC
       LIMIT 1
     ) latest ON true
     ORDER BY competitors.name ASC`,
  );

  const competitors = result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    positioning: row.positioning,
    latestPrice: row.latest_price !== null ? Number(row.latest_price) : null,
    latestPlan: row.latest_plan,
    latestDate: row.latest_date,
  }));

  return NextResponse.json({ competitors });
}

export async function POST(request: Request) {
  const { user, response } = await requireAdmin();
  if (!user) return response!;

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const positioning = typeof body?.positioning === "string" ? body.positioning : "";

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const result = await pool.query(
    "INSERT INTO competitors (name, positioning) VALUES ($1, $2) RETURNING id, name, positioning, created_at, updated_at",
    [name, positioning],
  );

  return NextResponse.json({ competitor: result.rows[0] }, { status: 201 });
}
