import { NextResponse, NextRequest } from "next/server";
import { levelOneQuestions } from "@/data/level_one_questions";

export async function GET(request: NextRequest) {
  return NextResponse.json({ levelOneQuestions });
}
