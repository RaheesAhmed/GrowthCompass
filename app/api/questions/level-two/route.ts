import { getLevelTwoQuestions } from "@/lib/questions/process_level_two";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { capability, level } = (await request.json()) as {
      capability: string;
      level: number;
    };

    // Remove any leading/trailing spaces from capability
    const normalizedCapability = capability.trim();

    // Add a space before the capability to match the data structure
    const formattedCapability = normalizedCapability.startsWith(" ")
      ? normalizedCapability
      : ` ${normalizedCapability}`;

    const questions = await getLevelTwoQuestions(formattedCapability, level);

    return NextResponse.json({ levelTwoQuestions: questions });
  } catch (error) {
    console.error("Error processing level two questions:", error);
    return NextResponse.json(
      { error: "Failed to process level two questions" },
      { status: 500 }
    );
  }
}
