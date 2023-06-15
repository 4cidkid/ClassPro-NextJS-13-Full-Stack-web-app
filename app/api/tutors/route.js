import { NextResponse } from "next/server";
import pool from "../db";
import { selectAdvertisements,selectAnyAdvertisements } from "../querys";
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const subject = searchParams.get("subject");
  const level = searchParams.get("level");
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  let response;
  if(subject && level && min && max){
    response =  await pool.query(selectAdvertisements(subject,min,max,level))
  }else{
    response = await pool.query(selectAnyAdvertisements())
  }
  return NextResponse.json({ response: response.rows });
}
