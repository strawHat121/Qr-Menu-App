import pg from "pg";
const { Pool } = pg;
import 'dotenv/config';


let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: {
        require: true,
    } as any,
})

async function getPgVersion() {
    const client = await pool.connect();
    try {
        const result= await client.query('SELECT version()');
        console.log(result.rows[0]);
    } finally {
        client.release();
    }
}
getPgVersion();