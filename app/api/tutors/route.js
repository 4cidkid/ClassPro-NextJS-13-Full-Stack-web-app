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
    response = await getUsersWithParams(subject, level, min, max);
    return NextResponse.json({
      response: response.response.rows,
      language: response.language.rows,
    });
  } else {
    response = await getSingleUser(id);
    return NextResponse.json({
      response: response.rows,
    });
  }
}

const getSingleUser = async (id) => {
  const response = await pool.query(getTutorinfo(id));
  return response;
};

const getUsersWithParams = async (subject, level, min, max) => {
  let response;
  let language;
  //if subject && level && min && max are defined then send a query with requested info
  if (subject && level && min && max) {
    if (subject.toLowerCase() === "all" && level.toLowerCase() != "all") {
      response = await pool.query(selectAdvertisementsLevel(min, max, level));
      language = await pool.query(selectTutorLanguages(min, max, level));
    } else if (
      level.toLowerCase() === "all" &&
      subject.toLowerCase() != "all"
    ) {
      response = await pool.query(
        selectAdvertisementsSubject(subject, min, max)
      );
      language = await pool.query(selectTutorLanguages(subject, min, max));
    } else if (
      level.toLowerCase() === "all" &&
      subject.toLowerCase() === "all"
    ) {
      response = await pool.query(selectAdvertisementsMin(min, max));
      language = await pool.query(selectTutorLanguages(min, max));
    } else {
      response = await pool.query(
        selectAdvertisements(subject, min, max, level)
      );
      language = await pool.query(
        selectTutorLanguages(subject, min, max, level)
      );
    }
  } else {
    //if none of the params are defined, then send a query to get all tutors
    response = await pool.query(selectAnyAdvertisements());
    language = await pool.query(selectTutorLanguages());
  }
  return {
    response,
    language,
  };
};
