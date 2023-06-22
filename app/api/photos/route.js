/*this was a lot of trouble, it's my first time working with AWS and with file uploading, thx to:
1-ChatGPT <---- Very outdated info, but it was very helpful in certain things
2-Github <---- i was facing a problem with formidable package, it seems that /app folder in nextjs 13 has a problem with 
formidable, but i found the correct answer in github so thx github and user redmatrice */
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse, NextRequest } from "next/server";
import dotenv from "dotenv";
dotenv.config({ path: "app/api/.env" });
export const config = {
  api: {
    bodyParser: false,
  },
};
const client = new S3Client({
  region: process.env.REGION,
});

export async function POST(req, res) {
  const formData = await req.formData();
  const file = formData.get("file");
  console.log(file);
  const fileBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: file.name,
    Body: buffer,
    ContentType: file.type,
  });
  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }

  return NextResponse.json({ msg: "hola" });
}
