import { NextResponse, NextRequest } from "next/server";
import { getLevelOneQuestionsByLevel } from "@/lib/questions/process_level_one";

export async function GET(
  request: NextRequest,
  { params }: { params: { level: string } }
) {
  const data = await params;
  const level = data.level;

  try {
    const questions = await getLevelOneQuestionsByLevel({ level });
    return NextResponse.json({ levelOneQuestions: questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
