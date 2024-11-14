import { z } from "zod";

export const demographicSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  industry: z.string().min(1, "Please specify your industry"),
  companySize: z
    .number()
    .int()
    .min(0, "Company size must be a non-negative number")
    .default(0),
  department: z.string().min(1, "Please specify your department"),
  jobTitle: z.string().min(1, "Please enter your job title"),
  directReports: z
    .number()
    .int()
    .min(0, "Number of direct reports must be 0 or greater")
    .default(0),
  reportingRoles: z
    .string()
    .min(1, "Please specify reporting roles or enter 'None'"),
  decisionLevel: z.enum(["Operational", "Tactical", "Strategic"]),
  typicalProject: z
    .string()
    .min(20, "Please provide a detailed description of your typical project"),
  levelsToCEO: z
    .number()
    .int()
    .min(0, "Levels to CEO must be 0 or greater")
    .default(0),
  managesBudget: z.boolean().default(false),
  userId: z.string().optional(),
});

export type DemographicFormData = z.infer<typeof demographicSchema>;
