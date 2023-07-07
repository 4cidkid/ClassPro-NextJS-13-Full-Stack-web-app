import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
dotenv.config({ path: "app/api/.env" });
import pool from "../db";
export async function POST(req, res) {
  /*encrypt user data to save it on the browser */
  if (req.headers.get("co") === "cry" || req.headers.get("co") === "dec") {
    return await saveUserDataOnRegistration(req);
  } else {
  }
}
const saveUserDataOnRegistration = async (req) => {
  let userExist;
  try {
     userExist = await pool.query(
      "SELECT student_id FROM students WHERE LOWER(student_email) = $1",
      [req.headers.get("user").toLowerCase()]
    );
  } catch (err) {
    return NextResponse.json({ msg: "Server Internal Error" }, { status: 500 });
  }
  let userEncrypt;
  let passwordEncrypt;
  if (userExist.rows.length === 0) {
    if (req.headers.get("co") === "cry") {
      try {
        userEncrypt = CryptoJS.AES.encrypt(
          JSON.stringify(req.headers.get("user")),
          process.env.SECRET_KEY_C
        ).toString();
        passwordEncrypt = CryptoJS.AES.encrypt(
          JSON.stringify(req.headers.get("password")),
          process.env.SECRET_KEY_C
        ).toString();
        return NextResponse.json(
          { user: userEncrypt, pass: passwordEncrypt },
          { status: 200 }
        );
      } catch (e) {
        if (e) {
          return NextResponse.json(
            { msg: "Data couln't be encrypted" },
            { status: 500 }
          );
        }
      }
    } else if (req.headers.get("co") === "dec") {
      /*decrypt user data to retrieve in state */
      try {
        const decryptedBytes = CryptoJS.AES.decrypt(
          req.headers.get("user"),
          process.env.SECRET_KEY_C
        );
        const decryptedData = JSON.parse(
          decryptedBytes.toString(CryptoJS.enc.Utf8)
        );
        const decryptedBytesPassword = CryptoJS.AES.decrypt(
          req.headers.get("password"),
          process.env.SECRET_KEY_C
        );
        const decryptedDataPassword = JSON.parse(
          decryptedBytesPassword.toString(CryptoJS.enc.Utf8)
        );
        return NextResponse.json({
          user: decryptedData,
          pass: decryptedDataPassword,
        });
      } catch (e) {
        if (e) {
          return NextResponse.json(
            { msg: "Data couln't be decrypted" },
            { status: 500 }
          );
        }
      }
    }
  } else {
    return NextResponse.json(
      {
        msg: "Email Already Registered",
      },
      { status: 409 }
    );
  }
};
