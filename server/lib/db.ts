import path from "node:path";
import { config } from "dotenv";
import { Pool } from "pg";

config({ path: path.join(process.cwd(), "..", ".env") });

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
