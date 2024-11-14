import { levelTwoQuestions } from "@/data/level_two_questions";

// Add interface for the level two question data structure
interface LevelTwoQuestion {
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
  [key: string]: string | number; // Add index signature for other possible capabilities
}

export async function readLevelTwoQuestions() {
  const questions = levelTwoQuestions;
  return questions;
}

export async function getLevelTwoQuestions(
  capability: string,
  level: string | number
) {
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

    const levelData = levelTwoQuestions.find(
      (q) => q.Lvl === numericLevel
    ) as LevelTwoQuestion;
    if (!levelData) {
      console.error(`No data found for level ${level}`);
      return [];
    }

    const capabilityKey = ` ${capability}`;
    const capabilityContent = levelData[capabilityKey];

    if (!capabilityContent) {
      console.error(
        `No content found for capability "${capability}" at level ${level}`
      );
      return [];
    }

    const themesAndFocusAreas = parseAllAreasForLevelTwo(capabilityContent);

    return themesAndFocusAreas.map((theme, index) => ({
      id: `${capability}-l2-${index}`,
      capability,
      level: numericLevel,
      question: `Regarding "${theme}", please describe your specific challenges and experiences:`,
      theme,
      type: "detailed",
      requiresReflection: true,
    }));
  } catch (error) {
    console.error("Error getting level two questions:", error);
    throw error;
  }
}

function parseAllAreasForLevelTwo(content: string) {
  if (typeof content !== "string") {
    return [];
  }

  const lines = content.split("\n");
  const themes = [];

  let currentTheme = "";

  for (let line of lines) {
    line = line.trim();

    // Skip empty lines
    if (!line) continue;

    // If line starts with "Themes or Focus Areas:", skip it
    if (line.startsWith("Themes or Focus Areas:")) continue;

    // If line ends with colon, it's a new theme header
    if (line.endsWith(":")) {
      if (currentTheme) {
        themes.push(currentTheme.trim());
      }
      currentTheme = line;
    } else {
      // If we have a current theme, append this line to it
      if (currentTheme) {
        currentTheme += " " + line;
      } else {
        // If no current theme but line contains colon, treat as complete theme
        if (line.includes(":")) {
          themes.push(line.trim());
        }
      }
    }
  }

  // Don't forget to add the last theme
  if (currentTheme) {
    themes.push(currentTheme.trim());
  }

  return themes.filter((theme) => theme && theme.includes(":"));
}
