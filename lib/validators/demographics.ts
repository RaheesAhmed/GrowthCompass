import { z } from "zod";

// Enhanced job function enum with descriptive mapping
const JobFunction = {
  individual_contributor: "individual_contributor",
  team_lead: "team_lead",
  department_manager: "department_manager",
  senior_manager: "senior_manager",
  director: "director",
  executive: "executive",
  c_level: "c_level",
} as const;

// Expanded decision level enum with clearer definitions
const DecisionLevel = {
  operational: "operational", // Day-to-day decisions
  tactical: "tactical", // Short to medium-term planning
  strategic: "strategic", // Long-term organizational impact
} as const;

// Enhanced budget management with structured data
const BudgetManagement = z.union([
  z.enum(["no", "team", "project", "department", "multiple", "company"]),
  z.object({
    hasBudget: z.enum(["yes", "no"]),
    budgetTypes: z.array(
      z.enum(["team", "project", "department", "multiple", "company"])
    ),
    budgetSize: z.string().optional(),
    budgetDescription: z.string().optional(),
  }),
]);

// Expanded reporting structure
const ReportingStructure = z.object({
  directCount: z.number().int().min(0),
  indirectCount: z.number().int().min(0).optional(),
  reportingRoles: z.array(z.string()).min(1),
  hasIndirectReports: z.enum(["yes", "no"]),
});

// Project impact measurement with backward compatibility
const ProjectImpact = z.union([
  z.string().min(20),
  z.object({
    description: z.string().min(20),
    metrics: z.array(z.string()).optional(),
    scope: z
      .enum(["team", "department", "division", "organization"])
      .optional(),
    duration: z.string().optional(),
    outcome: z.string().optional(),
  }),
]);

// Enhanced demographic schema with structured data capture and backward compatibility
export const demographicSchema = z
  .object({
    // Basic Information
    name: z.string().min(1, "Please enter your name"),
    industry: z.string().min(1, "Please specify your industry"),
    employeeCount: z
      .number()
      .int()
      .min(0, "Company size must be a non-negative number"),
    department: z.string().min(1, "Please specify your department"),

    // Role Information
    jobTitle: z.string().min(1, "Please enter your job title"),
    jobFunction: z.enum(Object.values(JobFunction) as [string, ...string[]], {
      required_error: "Please select your job function",
    }),

    // Responsibilities
    primaryResponsibilities: z
      .string()
      .min(20, "Please provide a detailed description of your responsibilities")
      .refine(
        (val) => val.split(" ").length >= 10,
        "Please provide at least 10 words describing your responsibilities"
      ),

    // Reporting Structure - with backward compatibility
    directReports: z.number().int().min(0).optional(),
    reportingRoles: z
      .union([z.string().min(1), z.array(z.string()).min(1)])
      .optional(),
    hasIndirectReports: z.enum(["yes", "no"]),
    reportingStructure: ReportingStructure.optional(),
    levelsToCEO: z.number().int().min(0, "Levels to CEO must be 0 or greater"),

    // Decision Making
    decisionLevel: z.enum(
      Object.values(DecisionLevel) as [string, ...string[]],
      {
        required_error: "Please select your decision-making level",
      }
    ),
    decisionExamples: z.array(z.string()).optional(),

    // Project Management
    typicalProject: ProjectImpact,

    // Budget Management
    managesBudget: BudgetManagement.optional(),
    budgetResponsibility: BudgetManagement.optional(),
    budgetSize: z.string().optional(),

    // Additional Context
    keyInitiatives: z.array(z.string()).optional(),
    crossFunctionalWork: z.boolean().optional(),
    strategicInfluence: z.string().optional(),

    // System Fields
    userId: z.string().optional(),
  })
  .transform((data) => {
    // Transform legacy data structure to new format
    const transformed = { ...data };

    // Handle reporting structure
    if (
      !transformed.reportingStructure &&
      transformed.directReports !== undefined
    ) {
      transformed.reportingStructure = {
        directCount: transformed.directReports,
        reportingRoles: Array.isArray(transformed.reportingRoles)
          ? transformed.reportingRoles
          : transformed.reportingRoles?.split(/,\s*/),
        hasIndirectReports: transformed.hasIndirectReports,
      };
    }

    // Handle project impact
    if (typeof transformed.typicalProject === "string") {
      transformed.typicalProject = {
        description: transformed.typicalProject,
        scope: transformed.department?.toLowerCase().includes("corporate")
          ? "organization"
          : "department",
      };
    }

    // Handle budget responsibility
    if (!transformed.budgetResponsibility && transformed.managesBudget) {
      if (typeof transformed.managesBudget === "string") {
        transformed.budgetResponsibility = transformed.managesBudget;
      } else {
        transformed.budgetResponsibility = transformed.managesBudget;
      }
    }

    return transformed;
  });

// Export type definitions
export type JobFunctionType = keyof typeof JobFunction;
export type DecisionLevelType = keyof typeof DecisionLevel;
export type DemographicFormData = z.infer<typeof demographicSchema>;

// Validation helper functions
export const validateBudgetSize = (size: string): boolean => {
  const pattern = /^\$?\d+(\.\d{1,2})?\s*(k|m|b|thousand|million|billion)?$/i;
  return pattern.test(size);
};

export const validateResponsibilities = (resp: string): boolean => {
  const minWords = 10;
  const words = resp.trim().split(/\s+/);
  return words.length >= minWords;
};

export const validateProjectImpact = (impact: any): boolean => {
  if (typeof impact === "string") {
    return impact.length >= 20;
  }
  return (
    impact.description.length >= 20 &&
    (!impact.metrics || impact.metrics.length > 0) &&
    (!impact.outcome || impact.outcome.length > 0)
  );
};
