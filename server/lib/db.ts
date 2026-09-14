import path from "node:path";
import { config } from "dotenv";
import { Pool, types } from "pg";

config({ path: path.join(process.cwd(), "..", ".env") });

// Return DATE columns as their raw "YYYY-MM-DD" string instead of a JS Date —
// pg's default parsing otherwise round-trips through local-timezone semantics
// and can shift the value by a day when serialized to JSON.
const DATE_OID = 1082;
types.setTypeParser(DATE_OID, (value: string) => value);

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
