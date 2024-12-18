import { NextResponse, NextRequest } from "next/server";
import { demographicSchema } from "@/lib/validators/demographics";
import { classifyResponsibilityLevel } from "@/lib/classifiers/responsibility-level";
import { ResponsibilityLevelInput } from "@/types/responsibilityLevel";

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

    // Map the validated data to the classifier input format
    const classifierInput: ResponsibilityLevelInput = {
      employeeCount: data.employeeCount,
      directReports: data.directReports,
      decisionLevel: data.decisionLevel.toLowerCase(),
      levelsToCEO: data.levelsToCEO,
      reportingRoles: data.reportingRoles,
      jobFunction: data.jobFunction,
      hasIndirectReports: data.hasIndirectReports,
      managesBudget: data.managesBudget,
      // Additional context fields
      industry: data.industry,
      department: data.department,
      jobTitle: data.jobTitle,
      primaryResponsibilities: data.primaryResponsibilities,
      typicalProject: data.typicalProject,
    };

    const responsibilityLevel = await classifyResponsibilityLevel(
      classifierInput
    );

    // Return the classification results with additional context
    return NextResponse.json({
      success: true,
      data: {
        responsibilityLevel: responsibilityLevel.level,
        role: responsibilityLevel.role,
        description: responsibilityLevel.description,
        versionInfo: responsibilityLevel.versionInfo,
        context: {
          jobFunction: data.jobFunction,
          decisionLevel: data.decisionLevel,
          directReports: data.directReports,
          hasIndirectReports: data.hasIndirectReports,
          managesBudget: data.managesBudget,
        },
      },
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
