import { NextResponse } from "next/server";
export async function POST(req,res){
    console.log('post')
    return NextResponse.json({good})
}