import { responsibilityLevel } from "@/data/responsibility_level";
import { ResponsibilityLevelInput } from "@/types/responsibilityLevel";

export async function classifyResponsibilityLevel(
  data: ResponsibilityLevelInput
) {
  const {
    employeeCount,
    directReports,
    decisionLevel,
    levelsToCEO,
    managesBudget,
    reportingRoles,
    jobFunction,
    hasIndirectReports,
  } = data;
  let score = 0;

  // Direct reports (0.30 weight)
  const reportsScore =
    directReports === 0
      ? 0.1
      : directReports <= 5
      ? 0.25
      : directReports <= 8
      ? 0.35
      : directReports <= 12
      ? 0.45
      : directReports <= 20
      ? 0.6
      : 0.7;

  // Add bonus for having indirect reports
  const indirectReportsBonus = hasIndirectReports === "yes" ? 0.1 : 0;
  const totalReportsScore = Math.min(reportsScore + indirectReportsBonus, 1.0);

  // Job function (0.25 weight)
  const jobFunctionScore =
    jobFunction === "c_level"
      ? 1.0
      : jobFunction === "executive"
      ? 0.9
      : jobFunction === "director"
      ? 0.8
      : jobFunction === "senior_manager"
      ? 0.7
      : jobFunction === "department_manager"
      ? 0.6
      : jobFunction === "team_lead"
      ? 0.4
      : 0.2;

  // Decision level (0.20 weight)
  const decisionScore =
    decisionLevel === "strategic"
      ? 1.0
      : decisionLevel === "tactical"
      ? 0.6
      : 0.3;

  // Levels to CEO (0.15 weight)
  const levelScore =
    levelsToCEO <= 1
      ? 1.0
      : levelsToCEO <= 2
      ? 0.8
      : levelsToCEO <= 3
      ? 0.6
      : levelsToCEO <= 4
      ? 0.4
      : 0.2;

  // Budget management (0.10 weight)
  const budgetScore =
    managesBudget === "company"
      ? 1.0
      : managesBudget === "multiple"
      ? 0.8
      : managesBudget === "department"
      ? 0.6
      : 0.2;

  // Calculate weighted scores
  score += totalReportsScore * 0.3; // Direct reports weight
  score += jobFunctionScore * 0.25; // Job function weight
  score += decisionScore * 0.2; // Decision level weight
  score += levelScore * 0.15; // Levels to CEO weight
  score += budgetScore * 0.1; // Budget management weight

  // Role complexity bonus
  let complexityScore = 0;
  const rolesLower = reportingRoles.toLowerCase();

  if (decisionLevel !== "operational") {
    if (rolesLower.includes("supervisor")) complexityScore += 0.02;
    if (rolesLower.includes("manager")) complexityScore += 0.03;
    if (rolesLower.includes("director")) complexityScore += 0.04;
    if (rolesLower.includes("vice president") || rolesLower.includes("vp"))
      complexityScore += 0.05;
  }
  score += complexityScore;

  // Add minimum score based on job function
  const baseScore =
    jobFunction === "c_level"
      ? 0.85
      : jobFunction === "executive"
      ? 0.75
      : jobFunction === "director"
      ? 0.65
      : jobFunction === "senior_manager"
      ? 0.55
      : jobFunction === "department_manager"
      ? 0.45
      : jobFunction === "team_lead"
      ? 0.35
      : 0.25;

  score = Math.max(score, baseScore);

  // Refined thresholds
  const thresholds = [
    { score: 0.3, level: "Individual Contributor" },
    { score: 0.34, level: "Team Lead" },
    { score: 0.38, level: "Supervisor" },
    { score: 0.43, level: "Manager" },
    { score: 0.55, level: "Senior Manager / Associate Director" },
    { score: 0.68, level: "Director" },
    { score: 0.78, level: "Senior Director / Vice President" },
    { score: 0.86, level: "Senior Vice President" },
    { score: 0.92, level: "Executive Vice President" },
    { score: 1.0, level: "Chief Officer (e.g., CEO, COO, CFO)" },
  ];

  // Debug logging
  console.log("Scores:", {
    reportsScore: totalReportsScore * 0.3,
    jobFunctionScore: jobFunctionScore * 0.25,
    decisionScore: decisionScore * 0.2,
    levelScore: levelScore * 0.15,
    budgetScore: budgetScore * 0.1,
    complexityScore,
    baseScore,
    totalScore: score,
  });

  const classifiedLevel =
    thresholds.find((t) => score <= t.score)?.level ||
    thresholds[thresholds.length - 1].level;

  const levelIndex = thresholds.findIndex((t) => t.level === classifiedLevel);
  const matchedLevel = responsibilityLevel.find(
    (level) => level["Responsibility Level"] === classifiedLevel
  );

  if (!matchedLevel)
    throw new Error("Unable to find matching responsibility level");

  return {
    role: classifiedLevel,
    level: levelIndex,
    description: matchedLevel.Description,
    versionInfo: {
      "v1.0": matchedLevel["v1.0"],
      "v2.0": matchedLevel["v2.0"],
    },
  };
}
