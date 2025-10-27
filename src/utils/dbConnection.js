import pg from "pg";

const dbConnectionString = process.env.DB_URL;
export const db = new pg.Pool({ connectionString: dbConnectionString });
