import { z } from "zod";

export const demographicSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  industry: z.string().min(1, "Please specify your industry"),
  employeeCount: z
    .number()
    .int()
    .min(0, "Company size must be a non-negative number"),
  department: z.string().min(1, "Please specify your department"),
  jobTitle: z.string().min(1, "Please enter your job title"),
  jobFunction: z.enum(
    [
      "individual_contributor",
      "team_lead",
      "department_manager",
      "senior_manager",
      "director",
      "executive",
      "c_level",
    ],
    {
      required_error: "Please select your job function",
    }
  ),
  primaryResponsibilities: z
    .string()
    .min(20, "Please provide a detailed description of your responsibilities"),
  directReports: z
    .number()
    .int()
    .min(0, "Number of direct reports must be 0 or greater"),
  reportingRoles: z
    .string()
    .min(1, "Please specify reporting roles or enter 'None'"),
  hasIndirectReports: z.enum(["yes", "no"], {
    required_error:
      "Please specify if your direct reports have their own reports",
  }),
  decisionLevel: z.enum(["operational", "tactical", "strategic"], {
    required_error: "Please select your decision-making level",
  }),
  typicalProject: z
    .string()
    .min(20, "Please provide a detailed description of your typical project"),
  levelsToCEO: z.number().int().min(0, "Levels to CEO must be 0 or greater"),
  managesBudget: z.enum(["no", "department", "multiple", "company"], {
    required_error: "Please specify your budget management responsibility",
  }),
  userId: z.string().optional(),
});

export type DemographicFormData = z.infer<typeof demographicSchema>;
