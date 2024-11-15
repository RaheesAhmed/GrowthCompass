import { levelTwoQuestions } from "@/data/level_two_questions";
import type { LevelTwoQuestion } from "@/types/level-two";

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

    const capabilityKey = ` ${capability}`; // Note the space before capability to match the data structure
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
  let isCollectingTheme = false;

  for (let line of lines) {
    line = line.trim();

    // Skip empty lines
    if (!line) continue;

    // If line starts with "Themes or Focus Areas", start collecting the theme
    if (line.toLowerCase().includes("themes or focus areas")) {
      isCollectingTheme = true;
      currentTheme = "";
      continue;
    }

    // If we're collecting a theme, add the line to current theme
    if (isCollectingTheme) {
      // Check for bullet points or numbered items
      if (line.match(/^[a-z]\.|^[0-9]\.|-|•/)) {
        if (currentTheme) {
          themes.push(currentTheme.trim());
        }
        currentTheme = line.replace(/^[a-z]\.|^[0-9]\.|-|•/, "").trim();
      } else if (currentTheme) {
        currentTheme += " " + line;
      } else {
        currentTheme = line;
      }

      // If we hit a significant break, save the theme
      if (line.endsWith(".") || line.endsWith("?")) {
        if (currentTheme) {
          themes.push(currentTheme.trim());
          currentTheme = "";
        }
      }
    }
  }

  // Add the last theme if there is one
  if (currentTheme) {
    themes.push(currentTheme.trim());
  }

  // Filter out any empty themes and clean up
  return themes
    .filter((theme) => theme && theme.length > 0)
    .map((theme) => theme.replace(/[\u0092]/g, "'").trim()); // Clean up special quotes
}
