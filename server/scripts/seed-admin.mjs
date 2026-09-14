import { fileURLToPath } from "node:url";
import path from "node:path";
import { config } from "dotenv";
import bcrypt from "bcryptjs";
import { Pool } from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, "..", "..", ".env") });

const [username, password] = process.argv.slice(2);

if (!username || !password) {
  console.error("Usage: node scripts/seed-admin.mjs <username> <password>");
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const passwordHash = await bcrypt.hash(password, 10);

try {
  const result = await pool.query(
    "INSERT INTO users (username, password_hash, role) VALUES ($1, $2, 'admin') RETURNING id, username, role",
    [username, passwordHash],
  );
  console.log("Seeded admin user:", result.rows[0]);
} finally {
  await pool.end();
}
