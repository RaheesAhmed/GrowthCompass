export interface ResponsibilityLevelInput {
    industry: string;
    companySize: number;
    department: string;
    jobTitle: string;
    directReports: number;
    decisionLevel: "Operational" | "Tactical" | "Strategic";
    typicalProject: string;
    levelsToCEO: number;
    managesBudget: boolean;
    reportingRoles: string;
  }