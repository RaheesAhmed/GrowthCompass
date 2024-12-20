import { NextResponse, NextRequest } from "next/server";
import {
  demographicSchema,
  type DemographicFormData,
} from "@/lib/validators/demographics";
import { classifyResponsibilityLevel } from "@/lib/classifiers/responsibility-level";
import type {
  ResponsibilityLevelInput,
  BudgetType,
  ProjectType,
  BudgetManagementType,
} from "@/types/responsibilityLevel";

interface ClassificationResponse {
  success: boolean;
  data: {
    level: number;
    role: string;
    description: string;
    versionInfo: {
      v1: string;
      v2: string;
    };
    context: {
      jobFunction: DemographicFormData["jobFunction"];
      decisionLevel: DemographicFormData["decisionLevel"];
      directReports: number;
      hasIndirectReports: DemographicFormData["hasIndirectReports"];
      managesBudget: BudgetManagementType | BudgetType;
      qualitativeScore: number;
    };
  };
}

interface ErrorResponse {
  error: string;
  details: unknown;
}

// Add context analysis helper functions
function analyzeDepartmentScope(department: string): string {
  const techDepartments = ["development", "engineering", "it", "software"];
  const department_lower = department.toLowerCase();

  if (techDepartments.some((tech) => department_lower.includes(tech))) {
    return "technical";
  }
  return "general";
}

function analyzeResponsibilityScope(responsibilities: string): string {
  const keywords = {
    technical: ["development", "coding", "architecture", "technical"],
    leadership: ["lead", "manage", "coordinate", "oversee"],
    strategic: ["strategy", "planning", "vision", "direction"],
  };

  const text = responsibilities.toLowerCase();
  let scope = [];

  if (keywords.technical.some((word) => text.includes(word)))
    scope.push("technical");
  if (keywords.leadership.some((word) => text.includes(word)))
    scope.push("leadership");
  if (keywords.strategic.some((word) => text.includes(word)))
    scope.push("strategic");

  return scope.join("_");
}

// Transform budget data to the correct format
function transformBudgetData(budget: any): BudgetManagementType | BudgetType {
  if (typeof budget === "string") {
    return budget as BudgetManagementType;
  }

  if (typeof budget === "object" && budget !== null) {
    return {
      hasBudget: budget.hasBudget,
      budgetTypes: budget.budgetTypes || [],
      budgetSize: budget.budgetSize,
      budgetDescription: budget.budgetDescription,
    };
  }

  return "no";
}

// Transform project data to the correct format
function transformProjectData(project: any): string | ProjectType {
  if (typeof project === "string") {
    return project;
  }

  if (typeof project === "object" && project !== null) {
    return {
      description: project.description || "",
      scope: project.scope,
      duration: project.duration,
      metrics: project.metrics,
      outcome: project.outcome,
    };
  }

  return "";
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ClassificationResponse | ErrorResponse>> {
  try {
    const demographic = await request.json();
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

    // Transform data to the correct format
    const classifierInput: ResponsibilityLevelInput = {
      employeeCount: data.employeeCount,
      directReports: data.directReports || 0,
      decisionLevel: data.decisionLevel,
      levelsToCEO: data.levelsToCEO,
      reportingRoles: data.reportingRoles || [],
      jobFunction: data.jobFunction,
      hasIndirectReports: data.hasIndirectReports,
      managesBudget: transformBudgetData(data.managesBudget),
      industry: data.industry,
      department: data.department,
      jobTitle: data.jobTitle,
      primaryResponsibilities: data.primaryResponsibilities,
      typicalProject: transformProjectData(data.typicalProject),
      context: {
        organizationSize: {
          small: data.employeeCount <= 50,
          medium: data.employeeCount <= 500,
          large: data.employeeCount > 500,
        },
        industryContext: data.industry.toLowerCase(),
        departmentScope: analyzeDepartmentScope(data.department),
        responsibilityScope: analyzeResponsibilityScope(
          data.primaryResponsibilities
        ),
      },
    };

    const responsibilityLevel = await classifyResponsibilityLevel(
      classifierInput
    );

    return NextResponse.json({
      success: true,
      data: responsibilityLevel,
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
