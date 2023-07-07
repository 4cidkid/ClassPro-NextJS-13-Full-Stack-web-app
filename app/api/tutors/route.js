import { NextResponse } from "next/server";
import pool from "../db";
import {
  selectAdvertisements,
  selectAnyAdvertisements,
  selectTutorLanguages,
  selectAdvertisementsSubject,
  selectAdvertisementsLevel,
  selectAdvertisementsMin,
  getTutorinfo,
} from "../querys";
export async function GET(request) {
  //get params
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const subject = searchParams.get("subject");
  const level = searchParams.get("level");
  const min = searchParams.get("min");
  const max = searchParams.get("max");

  let response;
  //if not id then get all tutors
  if (!id) {
    try{
      response = await getUsersWithParams(subject, level, min, max);
      return NextResponse.json({
        response: response.response.rows,
        language: response.language.rows,
      },{status:200});
    }catch(e){
      if(e){
        return NextResponse.json({msg:"The server Couldn't get The Users"},{status:500})
      }
    }
  } else {
    try{
      response = await getSingleUser(id);
      return NextResponse.json({
        response: response.rows,
      },{status:200});
    }catch(e){
      if(e){
        return NextResponse.json({msg:"The server Couldn't get The User"},{status:500})
      }
    }
  }
}

const getSingleUser = async (id) => {
  const response = await pool.query(getTutorinfo,[id]);
  return response;
};

const getUsersWithParams = async (subject, level, min, max) => {
  let response;
  let language;
  //if subject && level && min && max are defined then send a query with requested info
  if (subject && level && min && max) {
    if (subject.toLowerCase() === "all" && level.toLowerCase() != "all") {
      response = await pool.query(selectAdvertisementsLevel,[min, max, level.toLowerCase()]);
      
    } else if (
      level.toLowerCase() === "all" &&
      subject.toLowerCase() != "all"
    ) {
      response = await pool.query(
        selectAdvertisementsSubject,[subject.toLowerCase(), min, max]
      );
    } else if (
      level.toLowerCase() === "all" &&
      subject.toLowerCase() === "all"
    ) {
      response = await pool.query(selectAdvertisementsMin,[min, max]);
    } else {
      response = await pool.query(
        selectAdvertisements
        ,[subject.toLowerCase(), min, max, level.toLowerCase()]
      );
      language = await pool.query(
        selectTutorLanguages
      );
    }
  } else {
    //if none of the params are defined, then send a query to get all tutors
    response = await pool.query(selectAnyAdvertisements);
  }
  language = await pool.query(selectTutorLanguages);
  return {
    response,
    language,
  };
};
