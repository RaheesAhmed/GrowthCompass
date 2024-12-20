export type DecisionLevelType = "operational" | "tactical" | "strategic";
export type BudgetManagementType =
  | "no"
  | "department"
  | "project"
  | "multiple"
  | "company"
  | "team";

export type JobFunctionType =
  | "individual_contributor"
  | "team_lead"
  | "department_manager"
  | "senior_manager"
  | "director"
  | "executive"
  | "c_level";

export interface ProjectType {
  description: string;
  scope?: "team" | "department" | "division" | "organization";
  duration?: string;
  metrics?: string[];
  outcome?: string;
}

export interface BudgetType {
  hasBudget: "yes" | "no";
  budgetTypes?: BudgetManagementType[];
  budgetSize?: string;
  budgetDescription?: string;
}

export interface ResponsibilityLevelInput {
  // Basic Information
  industry: string;
  employeeCount: number;
  department: string;
  jobTitle: string;

  // Role and Responsibilities
  jobFunction: JobFunctionType;
  primaryResponsibilities: string;
  typicalProject: string | ProjectType;

  // Reporting Structure
  directReports: number;
  reportingRoles: string | string[];
  hasIndirectReports: "yes" | "no";
  levelsToCEO: number;

  // Decision Making
  decisionLevel: DecisionLevelType;

  // Budget Management
  managesBudget: BudgetManagementType | BudgetType;
  budgetSize?: string;

  // Context (optional)
  context?: {
    organizationSize: {
      small: boolean;
      medium: boolean;
      large: boolean;
    };
    industryContext: string;
    departmentScope: string;
    responsibilityScope: string;
  };
}

export interface ResponsibilityLevelOutput {
  level: number;
  role: string;
  description: string;
  versionInfo: {
    v1: string;
    v2: string;
  };
  context: {
    jobFunction: JobFunctionType;
    decisionLevel: DecisionLevelType;
    directReports: number;
    hasIndirectReports: "yes" | "no";
    managesBudget: BudgetManagementType | BudgetType;
    qualitativeScore: number;
  };
}
