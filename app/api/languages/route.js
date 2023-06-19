import { NextResponse } from "next/server";
import pool from "../db";
import { getAllLanguagesList } from "../querys";
export async function GET() {
    const language = await pool.query(getAllLanguagesList())
    return NextResponse.json({languages:language.rows})
}