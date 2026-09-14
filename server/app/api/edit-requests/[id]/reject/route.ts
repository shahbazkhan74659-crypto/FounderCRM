import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { resolveEditRequest } from "@/lib/edit-requests";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(_request: Request, { params }: RouteContext) {
  const { user, response } = await requireAdmin();
  if (!user) return response!;

  const { id } = await params;
  const result = await resolveEditRequest(id, user.id, "rejected");
  return NextResponse.json(result.body, { status: result.status });
}
