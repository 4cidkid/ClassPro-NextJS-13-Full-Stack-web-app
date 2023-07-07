import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
dotenv.config({ path: "app/api/.env" });
export async function POST(req, res) {
  /*encrypt user data to save it on the browser */
  if (req.headers.get("co") === "cry" || req.headers.get("co") === "dec"){
    return saveUserDataOnRegistration(req)
  }else{

  }
}
const saveUserDataOnRegistration = (req) => {
  let userEncrypt;
  let passwordEncrypt;
  if (req.headers.get("co") === "cry") {
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
