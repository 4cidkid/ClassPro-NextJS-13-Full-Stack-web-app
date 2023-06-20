import { NextResponse } from "next/server";
import pool from "../db";
import {
  selectAdvertisements,
  selectAnyAdvertisements,
  selectTutorLanguages,
  selectTutorLanguagesFilter,
  selectAdvertisementsSubject,
  selectTutorLanguagesAll,
  selectTutorLanguageLevel,
  selectAdvertisementsLevel,
  selectTutorLanguageMin,
  selectAdvertisementsMin,
} from "../querys";
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const subject = searchParams.get("subject");
  const level = searchParams.get("level");
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  let response;
  let language;
//if subject && level && min && max are defined then send a query
  if (subject && level && min && max) {
    if (subject.toLowerCase() === "all" && level.toLowerCase() != "all") {
      response = await pool.query(selectAdvertisementsLevel(min, max, level));
      language = await pool.query(selectTutorLanguagesAll(min, max, level));
    } else if (
      level.toLowerCase() === "all" &&
      subject.toLowerCase() != "all"
    ) {
      response = await pool.query(selectAdvertisementsSubject(subject, min, max));
      language = await pool.query(selectAdvertisementsSubject(subject, min, max));
    } else if (
      level.toLowerCase() === "all" &&
      subject.toLowerCase() === "all"
    ) {
      response = await pool.query(selectAdvertisementsMin(min, max));
      language = await pool.query(selectTutorLanguageMin(min, max));
    } else {
      response = await pool.query(
        selectAdvertisements(subject, min, max, level)
      );
      language = await pool.query(
        selectTutorLanguagesFilter(subject, min, max, level)
      );
    }
  } else {
    //if none of the params are defined, then send a query to get all tutors
    response = await pool.query(selectAnyAdvertisements());
    language = await pool.query(selectTutorLanguages());
  }

  return NextResponse.json({
    response: response.rows,
    language: language.rows,
  });
}
