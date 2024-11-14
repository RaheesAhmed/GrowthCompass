import { NextResponse, NextRequest } from "next/server";
import { demographicSchema } from "@/lib/validators/demographics";
import {
  classifyResponsibilityLevel,
  ResponsibilityLevelInput,
} from "@/lib/classifiers/responsibility-level";

export async function POST(request: NextRequest) {
  try {
    const demographic = await request.json();

    // Log the incoming data for debugging
    console.log("Incoming data:", demographic);

    const validationResult = demographicSchema.safeParse(demographic);

    if (!validationResult.success) {
      console.error("Validation Error:", validationResult.error);
      return NextResponse.json(
        {
          error: "Invalid demographics data",
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    const classifierInput: ResponsibilityLevelInput = {
      industry: data.industry,
      companySize: data.companySize,
      department: data.department,
      jobTitle: data.jobTitle,
      directReports: data.directReports,
      decisionLevel: data.decisionLevel,
      typicalProject: data.typicalProject,
      levelsToCEO: data.levelsToCEO,
      managesBudget: data.managesBudget,
    };

    const responsibilityLevel = await classifyResponsibilityLevel(
      classifierInput
    );

    return NextResponse.json({
      success: true,
      data: {
        responsibilityLevel: responsibilityLevel.level,
        role: responsibilityLevel.role,
        description: responsibilityLevel.description,
        versionInfo: responsibilityLevel.versionInfo,
      },
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 }
    );
  }
}
