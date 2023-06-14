import { Pool } from 'pg';
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function fetchStudents() {
  try {
    const result = await pool.query('SELECT * FROM students');
    console.log(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
}

export default pool;