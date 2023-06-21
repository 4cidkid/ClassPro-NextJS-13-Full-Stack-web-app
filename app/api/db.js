import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: 'app/api/.env' });

//create pool to connect to PG DB
const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


export default pool;