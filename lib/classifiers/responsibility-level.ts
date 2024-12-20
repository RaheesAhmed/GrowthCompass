import type {
  ResponsibilityLevelInput,
  ResponsibilityLevelOutput,
  BudgetType,
  ProjectType,
  BudgetManagementType,
} from "@/types/responsibilityLevel";
import { responsibilityLevel } from "@/data/responsibility_roles";

// Role-specific terms derived from responsibility_roles.ts descriptions
const ROLE_TERMS = {
  chief_officer: {
    terms: [
      "board of directors",
      "overall strategy",
      "organizational performance",
      "executive team",
      "company performance",
      "mergers and acquisitions",
      "organizational outcomes",
      "scientific strategy",
      "regulatory compliance",
      "international institutions",
      "research strategy",
      "corporate governance",
      "stakeholder relations",
      "industry leadership",
    ],
    weight: 0.4,
  },
  executive: {
    terms: [
      "executive leadership",
      "corporate functions",
      "strategic initiatives",
      "organizational strategy",
      "multiple divisions",
      "executive team",
    ],
    weight: 0.2,
  },
  director: {
    terms: [
      "strategic objectives",
      "multiple teams",
      "organizational goals",
      "department strategy",
      "strategic planning",
      "cross-functional",
    ],
    weight: 0.15,
  },
  department_manager: {
    terms: [
      "product lifecycle",
      "cross-functional teams",
      "department objectives",
      "business alignment",
      "customer insights",
      "product strategy",
      "project leadership",
    ],
    weight: 0.12,
  },
  senior_manager: {
    terms: [
      "operational leadership",
      "departmental strategies",
      "key functions",
      "efficiency",
      "team development",
      "project oversight",
    ],
    weight: 0.12,
  },
  manager: {
    terms: [
      "team operations",
      "performance management",
      "daily operations",
      "team development",
      "process improvement",
    ],
    weight: 0.1,
  },
} as const;

// Enhanced scoring weights with role-based assessment
const CLASSIFICATION_WEIGHTS = {
  jobFunction: 0.45,
  directReports: 0.15,
  decisionLevel: 0.25,
  budgetResponsibility: 0.1,
  qualitativeFactors: 0.05,
} as const;

// Refined job function scoring with clearer mid-level distinctions
const JOB_FUNCTION_SCORES = {
  c_level: 1.0,
  executive: 0.85,
  director: 0.7,
  senior_manager: 0.5,
  department_manager: 0.4,
  team_lead: 0.25,
  individual_contributor: 0.1,
} as const;

// Enhanced decision level scoring with granular assessment
const DECISION_LEVEL_SCORES = {
  strategic: 1.0,
  tactical: 0.5,
  operational: 0.2,
} as const;

// Refined budget responsibility scoring with more granular thresholds
const BUDGET_SCORES = {
  company: 1.0,
  multiple: 0.5,
  department: 0.35,
  project: 0.25,
  team: 0.1,
  no: 0,
} as const;

// Budget amount extraction and normalization
function extractBudgetAmount(budgetSize: string): number {
  // Handle empty or invalid input
  if (!budgetSize) return 0;

  // Extract amount and unit using regex
  const match = budgetSize.match(
    /\$?\s*(\d+(?:\.\d+)?)\s*(k|m|b|thousand|million|billion)?(?:\s+(?:annually|per year|yearly|p\.a\.|\/year))?/i
  );

  if (!match) return 0;

  const [_, amount, unit] = match;
  const baseAmount = parseFloat(amount);

  // Convert based on unit
  switch (unit?.toLowerCase()) {
    case "k":
    case "thousand":
      return baseAmount * 1000;
    case "m":
    case "million":
      return baseAmount * 1000000;
    case "b":
    case "billion":
      return baseAmount * 1000000000;
    default:
      return baseAmount;
  }
}

// Enhanced budget responsibility scoring with size-based adjustments
function getBudgetScore(budget: BudgetManagementType | BudgetType): number {
  if (typeof budget === "string") {
    return BUDGET_SCORES[budget] || 0;
  }

  if (budget.hasBudget === "yes" && budget.budgetTypes?.length) {
    const budgetType = budget.budgetTypes[0];
    let score = BUDGET_SCORES[budgetType] || 0;

    // Budget size impact with more granular thresholds
    if (budget.budgetSize) {
      const amount = extractBudgetAmount(budget.budgetSize);

      // Enhanced scoring for large budgets
      if (budgetType === "company") {
        if (amount > 10000000) score = 1.0; // Over $10M
        else if (amount > 5000000) score = 0.9; // Over $5M
        else if (amount > 1000000) score = 0.8; // Over $1M
      } else if (budgetType === "multiple") {
        if (amount > 5000000) score = Math.min(score * 1.4, 0.9);
        else if (amount > 1000000) score = Math.min(score * 1.3, 0.8);
      }
    }

    // Consider strategic budget management
    if (budget.budgetDescription?.toLowerCase().includes("strategic")) {
      score = Math.min(score * 1.2, 1.0);
    }

    return score;
  }

  return 0;
}

// Enhanced project analysis
function getProjectText(project: string | ProjectType): string {
  if (typeof project === "string") {
    return project.toLowerCase();
  }

  const parts = [
    project.description,
    project.outcome,
    project.metrics?.join(" "),
  ].filter(Boolean);

  return parts.join(" ").toLowerCase();
}

// Improved qualitative analysis with enhanced C-level context
function analyzeQualitativeData(data: ResponsibilityLevelInput): number {
  let score = 0;
  const text = (data.primaryResponsibilities || "").toLowerCase();
  const projectText = getProjectText(data.typicalProject);
  const combinedText = `${text} ${projectText}`;

  // Enhanced C-level indicators
  if (data.jobFunction === "c_level") {
    if (combinedText.includes("board of directors")) score += 0.2;
    if (combinedText.includes("strategy")) score += 0.15;
    if (combinedText.includes("regulatory")) score += 0.1;
    if (data.levelsToCEO <= 1) score += 0.15;
  }

  // Score based on role-specific terms from responsibility definitions
  Object.entries(ROLE_TERMS).forEach(([role, { terms, weight }]) => {
    const matchCount = terms.filter((term) =>
      combinedText.includes(term)
    ).length;
    if (matchCount > 0) {
      // Weight score based on term matches and role alignment
      const roleAlignmentBonus = role === data.jobFunction ? 1.2 : 1.0;
      score += (matchCount / terms.length) * weight * roleAlignmentBonus;
    }
  });

  // Cross-functional leadership bonus
  if (combinedText.includes("cross-functional")) {
    score += 0.15; // Significant bonus for cross-functional leadership
  }

  // Product management specific terms
  const productTerms = [
    "product lifecycle",
    "customer insights",
    "product strategy",
    "market analysis",
    "product development",
    "roadmap",
  ];

  const productMatchCount = productTerms.filter((term) =>
    combinedText.includes(term)
  ).length;
  if (productMatchCount > 0) {
    score += (productMatchCount / productTerms.length) * 0.15;
  }

  // Organizational scope scoring
  const scopeIndicators = {
    enterprise: {
      terms: ["company-wide", "enterprise", "organization-wide", "corporate"],
      weight: 0.2,
    },
    regional: {
      terms: ["regional", "territory", "zone", "area"],
      weight: 0.15,
    },
    departmental: {
      terms: ["department", "function", "unit", "team"],
      weight: 0.1,
    },
  };

  Object.values(scopeIndicators).forEach(({ terms, weight }) => {
    if (terms.some((term) => combinedText.includes(term))) {
      score += weight;
    }
  });

  // Impact indicators from project/responsibilities
  const impactIndicators = {
    financial: /(?:\$[0-9]+(?:[kmb]|thousand|million|billion)|[0-9]+%)/i,
    improvement: /(improve|increase|optimize|enhance|reduce cost|efficiency)/i,
    scale: /(multiple|several|various) (teams|departments|divisions|regions)/i,
  };

  Object.values(impactIndicators).forEach((pattern) => {
    if (combinedText.match(pattern)) {
      score += 0.1;
    }
  });

  // Enhanced context factors for department managers
  const contextFactors = {
    companySize: data.employeeCount
      ? Math.min(data.employeeCount / 2000, 1) * 0.1
      : 0,
    budgetComplexity: typeof data.managesBudget === "object" ? 0.1 : 0,
    reportingDepth: data.hasIndirectReports === "yes" ? 0.1 : 0,
    levelProximity: Math.max(0, (5 - data.levelsToCEO) / 5) * 0.15,
    crossFunctional: combinedText.includes("cross-functional") ? 0.1 : 0,
  };

  score += Object.values(contextFactors).reduce((a, b) => a + b, 0);

  return Math.min(score, 1);
}

function calculateBaseScore(data: ResponsibilityLevelInput): number {
  let score = 0;

  // Core metrics scoring
  score +=
    (JOB_FUNCTION_SCORES[data.jobFunction] || 0) *
    CLASSIFICATION_WEIGHTS.jobFunction;

  // Enhanced decision level scoring
  let decisionScore = DECISION_LEVEL_SCORES[data.decisionLevel] || 0;

  // Boost tactical decisions for department managers
  if (
    data.jobFunction === "department_manager" &&
    data.decisionLevel === "tactical"
  ) {
    decisionScore *= 1.15; // 15% boost for tactical department managers
  }

  score += decisionScore * CLASSIFICATION_WEIGHTS.decisionLevel;

  // Direct reports scoring with role-specific thresholds
  const reportScore = Math.min(
    data.directReports /
      (data.jobFunction === "director"
        ? 15
        : data.jobFunction === "senior_manager"
        ? 25
        : data.jobFunction === "department_manager"
        ? 20
        : 10),
    1
  );
  score += reportScore * CLASSIFICATION_WEIGHTS.directReports;

  // Budget scoring with enhanced context
  const budgetScore = getBudgetScore(data.managesBudget);
  score += budgetScore * CLASSIFICATION_WEIGHTS.budgetResponsibility;

  // Qualitative assessment
  const qualitativeScore = analyzeQualitativeData(data);
  score += qualitativeScore * CLASSIFICATION_WEIGHTS.qualitativeFactors;

  return score;
}

function mapScoreToLevel(
  score: number,
  data: ResponsibilityLevelInput
): number {
  // Direct C-level detection
  if (
    data.jobFunction === "c_level" &&
    data.levelsToCEO <= 1 &&
    data.decisionLevel === "strategic"
  ) {
    return 9; // Ensure Chief Officer classification
  }

  let adjustedScore = score;

  // Enhanced C-level scoring
  if (data.jobFunction === "c_level") {
    adjustedScore *= 1.2; // 20% boost for C-level roles

    // Additional boost for strategic decision makers
    if (data.decisionLevel === "strategic") {
      adjustedScore *= 1.1;
    }
  }

  // Role-specific adjustments based on organizational context
  if (data.jobFunction === "c_level") {
    // Ensure high-level classification for C-level roles
    adjustedScore = Math.max(adjustedScore, 0.85);
  }

  // Department manager specific adjustments
  if (data.jobFunction === "department_manager") {
    // Prevent misclassification as Supervisor
    adjustedScore = Math.max(adjustedScore, 0.35);

    // Cross-functional leadership bonus
    if (
      data.primaryResponsibilities.toLowerCase().includes("cross-functional")
    ) {
      adjustedScore *= 1.1;
    }

    // Product management bonus
    if (data.department.toLowerCase().includes("product")) {
      adjustedScore *= 1.05;
    }
  }

  // Organizational distance adjustment
  if (data.levelsToCEO > 2 && data.jobFunction !== "c_level") {
    adjustedScore *= Math.pow(0.95, data.levelsToCEO - 2); // Progressive reduction
  }

  // Role-specific caps
  if (data.jobFunction === "senior_manager") {
    if (data.decisionLevel !== "strategic") {
      adjustedScore = Math.min(adjustedScore, 0.65); // Cap at Senior Director level
    }
    if (data.levelsToCEO >= 3) {
      adjustedScore = Math.min(adjustedScore, 0.55); // Cap at Director level
    }
  }

  // Refined thresholds with adjusted gaps
  if (adjustedScore >= 0.95) return 9; // Chief Officer
  if (adjustedScore >= 0.85) return 8; // EVP
  if (adjustedScore >= 0.75) return 7; // SVP
  if (adjustedScore >= 0.65) return 6; // VP/Senior Director
  if (adjustedScore >= 0.55) return 5; // Director
  if (adjustedScore >= 0.45) return 4; // Senior Manager
  if (adjustedScore >= 0.35) return 3; // Manager
  if (adjustedScore >= 0.25) return 2; // Supervisor
  if (adjustedScore >= 0.15) return 1; // Team Lead
  return 0; // Individual Contributor
}

export async function classifyResponsibilityLevel(
  data: ResponsibilityLevelInput
): Promise<ResponsibilityLevelOutput> {
  // Calculate the total score
  const totalScore = calculateBaseScore(data);

  // Map score to level with context
  const level = mapScoreToLevel(totalScore, data);

  // Find matching responsibility level from data
  const matchedLevel = responsibilityLevel.find((l) =>
    l["Responsibility Level"]
      .toLowerCase()
      .includes(
        level === 9
          ? "chief officer"
          : level === 8
          ? "executive vice president"
          : level === 7
          ? "senior vice president"
          : level === 6
          ? "senior director"
          : level === 5
          ? "director"
          : level === 4
          ? "senior manager"
          : level === 3
          ? "manager"
          : level === 2
          ? "supervisor"
          : level === 1
          ? "team lead"
          : "individual contributor"
      )
  );

  if (!matchedLevel) {
    throw new Error("Unable to classify responsibility level");
  }

  return {
    level,
    role: matchedLevel["Responsibility Level"],
    description: matchedLevel.Description,
    versionInfo: {
      v1: matchedLevel["v1.0"],
      v2: matchedLevel["v2.0"],
    },
    context: {
      jobFunction: data.jobFunction,
      decisionLevel: data.decisionLevel,
      directReports: data.directReports,
      hasIndirectReports: data.hasIndirectReports,
      managesBudget: data.managesBudget,
      qualitativeScore: analyzeQualitativeData(data),
    },
  };
}
