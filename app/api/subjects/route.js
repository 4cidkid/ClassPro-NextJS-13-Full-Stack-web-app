import { NextResponse } from "next/server";
import pool from "../db";
export async function GET(request) {
  const data = await pool.query('SELECT * FROM subjects')
  return NextResponse.json({ subjects: data.rows });
}