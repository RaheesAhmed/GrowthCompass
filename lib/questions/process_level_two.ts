import { levelTwoQuestions } from "@/data/level_two_questions";

interface LevelTwoData {
  Lvl: number;
  " Role Name": string;
  " Description": string;
  " Building a Team": string;
  " Developing Others": string;
  " Leading a Team to Get Results": string;
  " Managing Performance": string;
  " Managing the Business (Business Acumen)": string;
  " Personal Development": string;
  "Communicating as a Leader": string;
  " Creating the Environment (Employee Relations)": string;
  [key: string]: string | number; // Add index signature
}

export interface LevelTwoQuestion {
  id: string;
  capability: string;
  level: number;
  theme: string;
  question: string;
  context?: string;
  subQuestions: Array<{
    id: string;
    question: string;
    context: string;
  }>;
  type: string;
  requiresReflection: boolean;
}

export async function readLevelTwoQuestions() {
  const questions = levelTwoQuestions as LevelTwoData[];
  return questions;
}

export async function getLevelTwoQuestions(
  capability: string,
  level: string | number
): Promise<LevelTwoQuestion[]> {
  try {
    if (!levelTwoQuestions) {
      await readLevelTwoQuestions();
    }

    if (!levelTwoQuestions || !Array.isArray(levelTwoQuestions)) {
      console.error("Level two questions not properly loaded");
      return [];
    }

    const numericLevel =
      typeof level === "string" ? parseInt(level, 10) : level;
    const levelData = (levelTwoQuestions as LevelTwoData[]).find(
      (q) => q.Lvl === numericLevel
    );

    if (!levelData) {
      console.error(`No data found for level ${level}`);
      return [];
    }

    // Find the matching capability key by normalizing both strings
    const capabilityKey = Object.keys(levelData).find((key) => {
      const normalizedKey = key
        .replace(/[^\w\s]/g, "")
        .trim()
        .toLowerCase();
      const normalizedCapability = capability
        .replace(/[^\w\s]/g, "")
        .trim()
        .toLowerCase();
      return normalizedKey === normalizedCapability;
    });

    if (!capabilityKey) {
      console.error(
        `No content found for capability "${capability}" at level ${level}`
      );
      return [];
    }

    const capabilityContent = levelData[capabilityKey];
    if (!capabilityContent || typeof capabilityContent !== "string") {
      console.error(
        `Content is empty or invalid for capability "${capability}" at level ${level}`
      );
      return [];
    }

    // Split content by themes
    const themesContent = capabilityContent.split(
      /Themes or Focus Areas:?/i
    )[1];
    if (!themesContent) {
      return [];
    }

    const questions: LevelTwoQuestion[] = [];

    let currentTheme = "";
    let currentContext = "";
    let currentSubQuestions: Array<{ question: string; context: string }> = [];

    const lines = themesContent
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Skip empty lines and headers
      if (!line || line.toLowerCase().includes("themes or focus areas")) {
        continue;
      }

      // Check if this is a new theme (ends with a colon)
      if (line.includes(":")) {
        // If we have a previous theme, save it
        if (currentTheme) {
          questions.push({
            id: `${capability}-l2-${questions.length}`,
            capability: capability.trim(),
            level: numericLevel,
            theme: currentTheme.replace(/:/g, "").trim(),
            question: `How effectively do you handle ${currentTheme
              .toLowerCase()
              .replace(/:/g, "")}?`,
            context: currentContext.trim(),
            subQuestions: currentSubQuestions.map((sq, index) => ({
              id: `${capability}-l2-${questions.length}-sub-${index}`,
              question: `How do you approach ${sq.question.toLowerCase()}?`,
              context: sq.context,
            })),
            type: "detailed",
            requiresReflection: true,
          });
        }

        // Start a new theme
        const [themeName, themeContext] = line.split(":");
        currentTheme = themeName.trim();
        currentContext = themeContext ? themeContext.trim() : "";
        currentSubQuestions = [];
        continue;
      }

      // Check if this is a sub-point (contains a colon within the line)
      if (line.includes(":") && !line.endsWith(":")) {
        const [subQuestion, context] = line.split(":");
        currentSubQuestions.push({
          question: subQuestion.trim(),
          context: context.trim(),
        });
      } else {
        // Add to current context if it's not a sub-point
        currentContext += (currentContext ? " " : "") + line;
      }
    }

    // Add the last theme if there is one
    if (currentTheme) {
      questions.push({
        id: `${capability}-l2-${questions.length}`,
        capability: capability.trim(),
        level: numericLevel,
        theme: currentTheme.replace(/:/g, "").trim(),
        question: `How effectively do you handle ${currentTheme
          .toLowerCase()
          .replace(/:/g, "")}?`,
        context: currentContext.trim(),
        subQuestions: currentSubQuestions.map((sq, index) => ({
          id: `${capability}-l2-${questions.length}-sub-${index}`,
          question: `How do you approach ${sq.question.toLowerCase()}?`,
          context: sq.context,
        })),
        type: "detailed",
        requiresReflection: true,
      });
    }

    return questions.map((q) => ({
      ...q,
      theme: q.theme.replace(/[\u0092]/g, "'"),
      context: q.context?.replace(/[\u0092]/g, "'"),
      question: q.question.replace(/[\u0092]/g, "'"),
      subQuestions: q.subQuestions.map((sq) => ({
        ...sq,
        question: sq.question.replace(/[\u0092]/g, "'"),
        context: sq.context.replace(/[\u0092]/g, "'"),
      })),
    }));
  } catch (error) {
    console.error("Error getting level two questions:", error);
    throw error;
  }
}
