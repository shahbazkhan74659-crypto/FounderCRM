import { pool } from "./db";

interface ResolveResult {
  status: number;
  body: Record<string, unknown>;
}

/**
 * Resolves (approves or rejects) an edit request and notifies the submitting staff member.
 * Deliberately does NOT touch `competitors`/`competitor_pricing_history` — Admin must make
 * the actual data change separately via the direct-edit endpoints.
 */
export async function resolveEditRequest(
  id: string,
  adminId: number,
  decision: "approved" | "rejected",
): Promise<ResolveResult> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const existing = await client.query(
      `SELECT competitor_edit_requests.id, field, status, staff_id, competitors.name AS competitor_name
       FROM competitor_edit_requests
       JOIN competitors ON competitors.id = competitor_edit_requests.competitor_id
       WHERE competitor_edit_requests.id = $1
       FOR UPDATE`,
      [id],
    );
    const existingRequest = existing.rows[0];

    if (!existingRequest) {
      await client.query("ROLLBACK");
      return { status: 404, body: { error: "Edit request not found" } };
    }
    if (existingRequest.status !== "pending") {
      await client.query("ROLLBACK");
      return { status: 409, body: { error: "Request already resolved" } };
    }

    const updated = await client.query(
      `UPDATE competitor_edit_requests
       SET status = $1, resolved_by = $2, resolved_at = now()
       WHERE id = $3
       RETURNING id, field, proposed_value, reason, status, staff_id, resolved_by, resolved_at, created_at`,
      [decision, adminId, id],
    );

    const message = `Your ${existingRequest.field} edit request for ${existingRequest.competitor_name} was ${decision}.`;
    await client.query(
      "INSERT INTO notifications (user_id, message, edit_request_id) VALUES ($1, $2, $3)",
      [existingRequest.staff_id, message, id],
    );

    await client.query("COMMIT");

    const row = updated.rows[0];
    return {
      status: 200,
      body: {
        editRequest: {
          id: row.id,
          field: row.field,
          proposedValue: row.proposed_value,
          reason: row.reason,
          status: row.status,
          staffId: row.staff_id,
          resolvedBy: row.resolved_by,
          resolvedAt: row.resolved_at,
          createdAt: row.created_at,
        },
      },
    };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
