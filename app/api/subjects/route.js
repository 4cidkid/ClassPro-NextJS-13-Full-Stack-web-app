import { NextResponse } from "next/server";
import pool from "../db";
export async function GET() {
  //get all subjects
  try{
    const data = await pool.query('SELECT * FROM subjects')
    return NextResponse.json({ subjects: data.rows });
  }catch(err){
    if(err){
      return NextResponse.json({ msg: "Server Couldn't get subjects "},{status:500});
    }
  }
}