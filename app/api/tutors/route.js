import { NextResponse } from "next/server";
import pool from "../db";
import { selectAdvertisements,selectAnyAdvertisements,selectTutorLanguages } from "../querys";
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const subject = searchParams.get("subject");
  const level = searchParams.get("level");
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  let response;
  let language;
  try{
    if(subject && level && min && max){
      response =  await pool.query(selectAdvertisements(subject,min,max,level))
      language = await pool.query(selectTutorLanguages())
    }else{
      response = await pool.query(selectAnyAdvertisements())
      language = await pool.query(selectTutorLanguages(subject, min, max, level))
    }
  }catch(err) 
  {
    console.log(err)
  }

  return NextResponse.json({ response: response.rows,language: language.rows });
}
