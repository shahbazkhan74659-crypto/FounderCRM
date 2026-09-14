import path from "node:path";
import { loadEnvConfig } from "@next/env";
import { Pool } from "pg";

loadEnvConfig(path.join(process.cwd(), ".."));

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
