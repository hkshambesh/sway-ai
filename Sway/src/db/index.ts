import { Pool } from "pg";

// This file is responsible for creating a connection pool to the PostgreSQL database
// using the connection string from environment variables.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // let's assume the database is configured
});
