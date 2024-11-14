import { levelOneQuestions } from "@/data/level_one_questions";

export async function readLevelOneQuestions() {
  const questions = levelOneQuestions.flatMap(processLevelOneQuestion);
  return questions;
}

function processLevelOneQuestion(question: any) {
  const capabilities = [
    "Building a Team",
    "Developing Others",
    "Leading a Team to Get Results",
    "Managing Performance",
    "Managing the Business",
    "Personal Development",
    "Communicating as a Leader",
    "Creating the Environment",
  ];

  const processedQuestions: any[] = [];

  capabilities.forEach((capability) => {
    const skillKey = Object.keys(question).find((key) => {
      const normalizedKey = key.toLowerCase().trim();
      return (
        normalizedKey.includes(capability.toLowerCase()) &&
        normalizedKey.includes("skill")
      );
    });

    const confidenceKey = Object.keys(question).find((key) => {
      const normalizedKey = key.toLowerCase().trim();
      return (
        normalizedKey.includes(capability.toLowerCase()) &&
        normalizedKey.includes("confidence")
      );
    });

    if (skillKey && confidenceKey) {
      processedQuestions.push({
        capability: capability,
        level: question.Lvl,
        roleName: question.roleName || question[" Role Name"],
        question: question[skillKey],
        ratingQuestion: question[skillKey],
        reflection: question[confidenceKey],
      });
    }
  });

  return processedQuestions;
}

export async function getLevelOneQuestionsByLevel({
  level,
}: {
  level: string;
}) {
  const levelOneQuestions = await readLevelOneQuestions();
  console.log("Total level one questions:", levelOneQuestions?.length || 0);

  // Normalize the level string and convert to number
  const normalizedLevel = parseInt(level);

  if (isNaN(normalizedLevel)) {
    console.warn("Invalid level provided:", level);
    return [];
  }

  console.log("Normalized level:", normalizedLevel);

  // Filter questions for the specified level
  const filteredQuestions = levelOneQuestions.filter(
    (q: any) => q.level === normalizedLevel
  );

  // Group questions by capability area
  const questionsByArea = filteredQuestions.reduce(
    (acc: any, question: any) => {
      if (!acc[question.capability]) {
        acc[question.capability] = [];
      }
      acc[question.capability].push({
        question: question.question,
        ratingQuestion: question.ratingQuestion,
        reflection: question.reflection,
      });
      return acc;
    },
    {}
  );

  // Convert the grouped questions into the desired format
  const LevelOneQuestionsbyLevel = Object.entries(questionsByArea).map(
    ([area, questions]) => ({
      area,
      questions,
    })
  );

  return LevelOneQuestionsbyLevel;
}
