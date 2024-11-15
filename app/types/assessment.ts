export interface AssessmentResponse {
  questionId: string;
  rating: number;
  response: string;
  question: {
    question: string;
  };
  area: string;
}
