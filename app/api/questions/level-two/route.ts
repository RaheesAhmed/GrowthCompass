import { getLevelTwoQuestions } from "@/lib/questions/process_level_two";
import { NextRequest, NextResponse } from "next/server";

export interface LevelTwoRequestBody {
  capability: string;
  level: number;
  answers?: {
    skill: number;
    confidence: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LevelTwoRequestBody;
    const { capability, level, answers } = body;

    if (!capability || !level) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Remove any leading/trailing spaces from capability
    const normalizedCapability = capability.trim();

    // Add a space before the capability to match the data structure
    const formattedCapability = normalizedCapability.startsWith(" ")
      ? normalizedCapability
      : ` ${normalizedCapability}`;

    const questions = await getLevelTwoQuestions(formattedCapability, level);

    if (!questions || questions.length === 0) {
      return NextResponse.json(
        { error: "No questions found for the given parameters" },
        { status: 404 }
      );
    }

    return NextResponse.json({ levelTwoQuestions: questions });
  } catch (error) {
    console.error("Error processing level two questions:", error);
    return NextResponse.json(
      { error: "Failed to process level two questions" },
      { status: 500 }
    );
  }
}
