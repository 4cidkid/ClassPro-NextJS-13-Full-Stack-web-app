import { NextResponse } from "next/server";
import pool from "../db";
export async function GET() {
  //get all subjects
  try{
    const data = await pool.query('SELECT * FROM country')
  return NextResponse.json({ countries: data.rows });
}