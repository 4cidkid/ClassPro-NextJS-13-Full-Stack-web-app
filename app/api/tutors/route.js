import { NextResponse } from "next/server";
import pool from "../db";
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const subject = searchParams.get("subject");
  const level = searchParams.get("level");
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  console.log(subject,level,min,max)
  return NextResponse.json({ product: "hola" });
}

export async function POST(request){
  let data = []
  let images = []
  let i = 0;
  // do{
  //   data.push(JSON.stringify(generateData()))
  //   i++
  // }while(i<100)
  do{
    images.push(JSON.stringify({url:'',alt:'',time:new Date().getTime()}))
  }while(i<100)
  images.forEach((image) => {
    pool.query('INSERT INTO IMAGES(image_url,image_alt,uploaded_at) VALUES($1, $2,$3)',[image.url,image.alt,image.time])
  })
  NextResponse.json({ product: "hola" });
}

// const generateData = () => {
//   const 
// }


