import { responsibilityLevel } from "@/data/responsibility_level";
import { ResponsibilityLevelInput } from "@/types/responsibilityLevel";

export async function classifyResponsibilityLevel(
  data: ResponsibilityLevelInput
) {
  const {
    companySize,
    directReports,
    decisionLevel,
    levelsToCEO,
    managesBudget,
    reportingRoles,
  } = data;
  let score = 0;

  // Direct reports (0.35 weight)
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

  // Decision level modifier
  const isOperational = decisionLevel === "Operational";
  const reportScoreWithModifier = isOperational
    ? reportsScore * 0.7
    : reportsScore;
  score += reportScoreWithModifier * 0.35;

  // Decision level (0.30 weight)
  const decisionScore =
    decisionLevel === "Strategic"
      ? 1.0
      : decisionLevel === "Tactical"
      ? 0.45
      : 0.25;
  score += decisionScore * 0.3;

  // Levels to CEO (0.20 weight)
  const levelScore =
    levelsToCEO <= 1
      ? 1.0
      : levelsToCEO <= 2
      ? 0.75
      : levelsToCEO <= 3
      ? 0.5
      : levelsToCEO <= 4
      ? 0.35
      : 0.2;
  score += levelScore * 0.2;

  // Budget management (0.10 weight)
  const budgetScore = managesBudget ? 0.6 : 0.2; // Reduced impact
  score += budgetScore * 0.1;

  // Company size (0.05 weight)
  const sizeScore =
    companySize <= 250
      ? 0.3
      : companySize <= 1000
      ? 0.4
      : companySize <= 5000
      ? 0.5
      : companySize <= 10000
      ? 0.6
      : 0.7;
  score += sizeScore * 0.05;

  // Role complexity bonus
  let complexityScore = 0;
  const rolesLower = reportingRoles.toLowerCase();

  if (!isOperational) {
    if (rolesLower.includes("supervisor")) complexityScore += 0.02;
    if (rolesLower.includes("manager")) complexityScore += 0.03;
    if (rolesLower.includes("director")) complexityScore += 0.04;
  }
  score += complexityScore;

  // Add minimum score based on direct reports
  const baseScore = directReports >= 5 ? 0.35 : 0.25;
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
    reportsScore: reportScoreWithModifier * 0.35,
    decisionScore: decisionScore * 0.3,
    levelScore: levelScore * 0.2,
    budgetScore: budgetScore * 0.1,
    sizeScore: sizeScore * 0.05,
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
