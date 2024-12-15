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
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="space-y-1 pb-8">
          <CardTitle className="text-2xl text-center text-white">
            Leadership Assessment
          </CardTitle>
          <CardDescription className="text-center text-slate-400">
            Assess your leadership capabilities and identify areas for growth
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="mb-12">
            <Progress
              value={((currentQuestionIndex + 1) / questions.length) * 100}
              className="h-3 bg-slate-800"
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-slate-400">
                Progress:{" "}
                {Math.round(
                  ((currentQuestionIndex + 1) / questions.length) * 100
                )}
                % complete
              </p>
              <p className="text-sm text-slate-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-10">
                <div className="text-center mb-10">
                  <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20">
                    <h2 className="text-2xl font-medium bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {currentQuestion.theme}
                    </h2>
                  </div>
                  <div className="mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-50" />
                </div>

                <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-2xl">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold text-white/90 leading-relaxed">
                        {currentQuestion.question}
                      </h3>
                      {currentQuestion.context && (
                        <div className="mt-6 bg-white/[0.02] rounded-xl p-4 border border-white/5">
                          <p className="text-base text-white/70 leading-relaxed">
                            {currentQuestion.context}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="pt-8">
                      <p className="text-lg font-medium text-white mb-4">
                        Rate your overall proficiency in this area:
                      </p>
                      <div className="flex items-center justify-center space-x-6">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const isSelected = currentResponse?.rating >= star;
                          return (
                            <Button
                              key={star}
                              type="button"
                              onClick={() => handleRatingChange(star)}
                              variant="outline"
                              className={`w-16 h-16 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                                isSelected
                                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-none shadow-lg shadow-indigo-500/25"
                                  : "border-2 border-indigo-300/20 hover:border-indigo-400/40 bg-white/[0.02]"
                              }`}
                            >
                              <StarIcon
                                className={`w-8 h-8 transition-all duration-300 ${
                                  isSelected
                                    ? "fill-white stroke-none"
                                    : "stroke-indigo-300/60"
                                }`}
                              />
                            </Button>
                          );
                        })}
                      </div>
                      <div className="flex justify-center items-center space-x-2 text-sm font-medium mt-4">
                        <span className="text-rose-400/90">Not Effective</span>
                        <span className="text-slate-500">→</span>
                        <span className="text-emerald-400/90">
                          Highly Effective
                        </span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <label
                        htmlFor="answer"
                        className="block text-lg font-medium text-white mb-4"
                      >
                        Share your overall experiences and challenges:
                      </label>
                      <Textarea
                        id="answer"
                        value={currentResponse.response}
                        onChange={handleAnswerChange}
                        placeholder="Describe your overall approach and experiences with this aspect of leadership..."
                        className="w-full min-h-[120px] p-6 text-lg rounded-2xl bg-white/[0.02] border-white/10 
                          focus:border-indigo-500/50 focus:ring-indigo-500/50 placeholder:text-slate-500
                          transition-all duration-300 text-white/90"
                      />
                    </div>

                    {currentQuestion.subQuestions.length > 0 && (
                      <div className="pt-8 space-y-8">
                        <h4 className="text-xl font-medium text-white/90">
                          Specific Areas to Address:
                        </h4>
                        {currentQuestion.subQuestions.map((sq, index) => (
                          <div
                            key={sq.id}
                            className="space-y-4 bg-white/[0.01] rounded-xl p-6 border border-white/5"
                          >
                            <div>
                              <h5 className="text-lg font-medium text-white/80 mb-2">
                                {sq.question}
                              </h5>
                              <p className="text-sm text-white/60">
                                {sq.context}
                              </p>
                            </div>
                            <Textarea
                              value={
                                currentResponse.subResponses?.[index]
                                  ?.response || ""
                              }
                              onChange={(e) =>
                                handleSubAnswerChange(sq.id, e.target.value)
                              }
                              placeholder="Share your specific experiences and approach..."
                              className="w-full min-h-[100px] p-4 text-base rounded-xl bg-white/[0.02] border-white/10 
                                focus:border-indigo-500/50 focus:ring-indigo-500/50 placeholder:text-slate-500
                                transition-all duration-300 text-white/90"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex justify-between pt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <Button
            onClick={handleNext}
            disabled={isSubmitting}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>
                  {currentQuestionIndex === questions.length - 1
                    ? "Complete"
                    : "Next"}
                </span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
