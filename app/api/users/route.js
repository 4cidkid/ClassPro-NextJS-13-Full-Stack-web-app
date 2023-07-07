import { NextResponse } from "next/server";
import pool from "../db";
import dotenv from "dotenv";
dotenv.config({ path: "app/api/.env" });
import CryptoJS from "crypto-js";
export async function POST(req, res) {
  const userInfo = JSON.parse(req.headers.get("userData"));
  let response;
  const country = (
    await pool.query("SELECT id FROM country WHERE LOWER(name) = $1", [
      userInfo.country.toLowerCase(),
    ])
  ).rows[0];
  const passwordHash = CryptoJS.AES.encrypt(
    JSON.stringify(userInfo.password),
    process.env.SECRET_KEY_PASSWORDS
  ).toString();

  if (userInfo.phone) {
    try {
      response = await pool.query(
        "INSERT INTO students (student_name,student_lastname,student_email,student_phone,student_password,student_age,country_id) VALUES ($1,$2,$3,$4,$5,$6,$7)",
        [
          userInfo.name,
          userInfo.lastName,
          userInfo.email,
          userInfo.phone,
          passwordHash,
          userInfo.age,
          country.id,
        ]
      );
      return NextResponse.json({ msg: "User Created" },{status: 200});
    } catch (err) {
      if (err) {
       return NextResponse.json({ msg: "An error was encountered on request" },{status: 500});
      }
    }
  } else {
    try {
      response = await pool.query(
        "INSERT INTO students (student_name,student_lastname,student_email,student_password,student_age,country_id) VALUES ($1,$2,$3,$4,$5,$6)",
        [
          userInfo.name,
          userInfo.lastName,
          userInfo.email,
          passwordHash,
          userInfo.age,
          country.id,
        ]
      );
      return NextResponse.json({ msg: "User Created" },{status: 200});
    } catch (err) {
      if (err) {
       return NextResponse.json({ msg: "An error was encountered on request" },{status: 500});
      }
    }
  }
}
