"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StarIcon, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface SubQuestion {
  id: string;
  question: string;
  context: string;
}

interface LevelTwoQuestion {
  id: string;
  capability: string;
  level: number;
  question: string;
  theme: string;
  type: string;
  requiresReflection: boolean;
  context?: string;
  subQuestions: SubQuestion[];
}

interface UserResponse {
  questionId: string;
  rating: number;
  response: string;
  question: {
    question: string;
  };
  area: string;
  subResponses?: Array<{
    questionId: string;
    response: string;
  }>;
}

interface LevelTwoQuestionsProps {
  level: number;
  capability: string;
  skill: number;
  confidence: number;
  onComplete: (responses: UserResponse[]) => void;
}

export default function LevelTwoQuestions({
  level,
  capability,
  skill,
  confidence,
  onComplete,
}: LevelTwoQuestionsProps) {
  const [questions, setQuestions] = useState<LevelTwoQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Fetch questions only once when component mounts
  useEffect(() => {
    let isMounted = true;

    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/api/questions/level-two`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            level,
            capability,
            answers: {
              skill,
              confidence,
            },
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch level two questions");
        }

        const data = await response.json();
        const questions = data.levelTwoQuestions;

        if (!questions || questions.length === 0) {
          if (isMounted) {
            onComplete([]);
          }
          return;
        }

        if (isMounted) {
          setQuestions(questions);

          // Initialize user responses with sub-responses
          const initialResponses = questions.map((q: LevelTwoQuestion) => ({
            questionId: q.id,
            rating: 0,
            response: "",
            question: {
              question: q.question,
            },
            area: q.theme,
            subResponses: q.subQuestions.map((sq: SubQuestion) => ({
              questionId: sq.id,
              response: "",
            })),
          }));
          setUserResponses(initialResponses);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching level two questions:", error);
        if (isMounted) {
          setError("Failed to load questions. Please try again.");
          setLoading(false);
        }
      }
    };

    fetchQuestions();

    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - only run once on mount

  const currentQuestion = questions[currentQuestionIndex] || null;
  const currentResponse = userResponses[currentQuestionIndex] || {
    rating: 0,
    response: "",
    subResponses: [],
  };

  const handleRatingChange = (rating: number) => {
    setUserResponses((prev) => {
      const newResponses = [...prev];
      if (newResponses[currentQuestionIndex]) {
        newResponses[currentQuestionIndex] = {
          ...newResponses[currentQuestionIndex],
          rating: rating,
        };
      }
      return newResponses;
    });
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserResponses((prev) =>
      prev.map((r, i) =>
        i === currentQuestionIndex ? { ...r, response: e.target.value } : r
      )
    );
  };

  const handleSubAnswerChange = (subQuestionId: string, value: string) => {
    setUserResponses((prev) =>
      prev.map((r, i) =>
        i === currentQuestionIndex
          ? {
              ...r,
              subResponses: r.subResponses?.map((sr) =>
                sr.questionId === subQuestionId
                  ? { ...sr, response: value }
                  : sr
              ),
            }
          : r
      )
    );
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Validate responses
      const incompleteResponses = userResponses.filter(
        (r) =>
          r.rating === 0 ||
          !r.response.trim() ||
          r.subResponses?.some((sr) => !sr.response.trim())
      );

      if (incompleteResponses.length > 0) {
        toast({
          title: "Incomplete Responses",
          description:
            "Please complete all questions and sub-questions before proceeding.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Format responses to include all required fields
      const formattedResponses = userResponses.map((response, index) => {
        const question = questions[index];
        return {
          questionId: response.questionId,
          rating: response.rating,
          response: response.response,
          question: {
            question: question.question,
          },
          area: question.theme,
          subResponses: response.subResponses?.map((sr, srIndex) => ({
            questionId: sr.questionId,
            response: sr.response,
            question: {
              question: question.subQuestions[srIndex].question,
            },
          })),
        };
      });

      onComplete(formattedResponses);
    } catch (error) {
      console.error("Error submitting responses:", error);
      toast({
        title: "Error",
        description: "Failed to submit responses. Please try again.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      <div className="enterprise-card">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-primary-950 mb-2">
                Deep Dive Assessment
              </h1>
              <p className="text-lg text-surface-600">
                Explore specific aspects of your leadership capabilities
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-surface-600">
                Progress:{" "}
                {Math.round(
                  ((currentQuestionIndex + 1) / questions.length) * 100
                )}
                % complete
              </p>
              <p className="text-sm font-medium text-surface-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            <Progress
              value={((currentQuestionIndex + 1) / questions.length) * 100}
              className="h-2 enterprise-progress"
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          <div className="space-y-8">
            {/* Theme Header */}
            <div className="text-center">
              <div className="inline-block">
                <h2 className="text-2xl font-semibold text-primary-950">
                  {currentQuestion.theme}
                </h2>
                <div className="mt-2 h-0.5 w-20 mx-auto bg-primary-200" />
              </div>
            </div>

            {/* Main Question Card */}
            <div className="enterprise-card">
              <div className="p-8 space-y-8">
                {/* Question */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-medium text-primary-950">
                    {currentQuestion.question}
                  </h3>
                  {currentQuestion.context && (
                    <div className="bg-surface-50 rounded-xl p-6 border border-surface-200">
                      <p className="text-surface-600">
                        {currentQuestion.context}
                      </p>
                    </div>
                  )}
                </div>

                {/* Rating */}
                <div className="space-y-6">
                  <p className="text-lg font-medium text-primary-950">
                    Rate your overall proficiency in this area:
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isSelected = currentResponse?.rating >= star;
                      return (
                        <Button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          variant="outline"
                          className={`w-14 h-14 rounded-xl transition-all duration-300 ${
                            isSelected
                              ? "bg-primary-600 text-white border-primary-600 hover:bg-primary-700"
                              : "border-2 border-surface-200 hover:border-primary-200 bg-surface-50"
                          }`}
                        >
                          <StarIcon
                            className={`w-6 h-6 transition-all duration-300 ${
                              isSelected
                                ? "fill-white stroke-none"
                                : "stroke-surface-400"
                            }`}
                          />
                        </Button>
                      );
                    })}
                  </div>
                  <div className="flex justify-center items-center gap-4 text-sm font-medium">
                    <span className="text-surface-600">Not Effective</span>
                    <span className="text-surface-400">→</span>
                    <span className="text-surface-600">Highly Effective</span>
                  </div>
                </div>

                {/* Main Response */}
                <div className="space-y-4">
                  <label className="text-lg font-medium text-primary-950">
                    Share your overall experiences and challenges:
                  </label>
                  <Textarea
                    value={currentResponse.response}
                    onChange={handleAnswerChange}
                    placeholder="Describe your overall approach and experiences with this aspect of leadership..."
                    className="min-h-[180px] enterprise-textarea"
                  />
                </div>
              </div>
            </div>

            {/* Sub Questions */}
            {currentQuestion.subQuestions.length > 0 && (
              <div className="enterprise-card">
                <div className="p-8 space-y-8">
                  <h4 className="text-xl font-medium text-primary-950">
                    Specific Areas to Address
                  </h4>
                  <div className="space-y-8">
                    {currentQuestion.subQuestions.map((sq, index) => (
                      <div
                        key={sq.id}
                        className="space-y-4 bg-surface-50 rounded-xl p-6 border border-surface-200"
                      >
                        <div className="space-y-2">
                          <h5 className="text-lg font-medium text-primary-950">
                            {sq.question}
                          </h5>
                          <p className="text-surface-600">{sq.context}</p>
                        </div>
                        <Textarea
                          value={
                            currentResponse.subResponses?.[index]?.response ||
                            ""
                          }
                          onChange={(e) =>
                            handleSubAnswerChange(sq.id, e.target.value)
                          }
                          placeholder="Share your specific experiences and approach..."
                          className="min-h-[150px] enterprise-textarea"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="enterprise-button-secondary"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={isSubmitting}
          className="enterprise-button-primary group"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>
                {currentQuestionIndex === questions.length - 1
                  ? "Complete"
                  : "Next"}
              </span>
              <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
