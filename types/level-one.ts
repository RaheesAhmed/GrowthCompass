export interface Question {
  id: string;
  ratingQuestion: string;
  reflection: string;
  ratingDescription?: string;
  reflectionDescription?: string;
}

export interface AreaData {
  area: string;
  questions: Question[];
}

export interface LevelTwoQuestion {
  id: string;
  capability: string;
  level: number;
  question: string;
  theme: string;
  type: string;
  requiresReflection: boolean;
}

export interface AssessmentResponse {
  questionId?: string;
  rating?: number;
  response: string;
  reflectionRating?: number;
  reflection?: string;
  question: {
    ratingQuestion?: string;
    reflection?: string;
    question?: string;
  };
  area: string;
}

export interface Responses {
  [key: string]: string | number;
}

export interface LevelOneQuestionsProps {
  level: number;
  userInfo: {
    [key: string]: string;
    name: string;
    industry: string;
    companySize: string;
    department: string;
    jobTitle: string;
    directReports: string;
    decisionLevel: string;
    typicalProject: string;
    levelsToCEO: string;
    managesBudget: string;
  } | null;
  responsibilityLevel: FormattedResponsibilityLevel;
  onComplete: (answers: AssessmentResponse[]) => void;
}

export interface FormattedResponsibilityLevel {
  level: number;
  description: string;
}
