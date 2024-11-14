import { getLevelTwoQuestions } from "@/lib/questions/process_level_two";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { capability, level } = (await request.json()) as {
    capability: string;
    level: number;
  };

  const questions = await getLevelTwoQuestions(capability, level);
  return NextResponse.json({ levelTwoQuestions: questions });
}
