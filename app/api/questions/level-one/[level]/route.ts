import { NextResponse, NextRequest } from "next/server";
import { getLevelOneQuestionsByLevel } from "@/lib/questions/process_level_one";

export async function GET(
  request: NextRequest,
  { params }: { params: { level: string } }
) {
  const data = await params;
  const level = data.level;

  const levelOneQuestions = await getLevelOneQuestionsByLevel({ level });
  return NextResponse.json({ levelOneQuestions });
}
