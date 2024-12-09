import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.SUPABASE_HOST,
  port: Number(process.env.SUPABASE_PORT),
  database: process.env.SUPABASE_DATABASE,
  user: process.env.SUPABASE_USER,
  password: process.env.SUPABASE_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
