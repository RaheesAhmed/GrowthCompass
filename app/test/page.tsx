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
import type { AssessmentResponse } from "@/types/assessment";

export const dynamic = "force-dynamic";
export const revalidate = 0; // Disable caching for this page
interface LevelTwoQuestion {
  id: string;
  capability: string;
  level: number;
  question: string;
  theme: string;
  type: string;
  requiresReflection: boolean;
}

interface UserResponse {
  questionId: string;
  rating: number;
  answer: string;
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

  useEffect(() => {
    const fetchQuestions = async () => {
      const result = await fetchLevelTwoQuestions(
        level,
        capability,
        skill,
        confidence
      );
      if (result.length === 0) {
        // If no questions, notify parent to continue with previous state
        onComplete([]);
      }
    };
    fetchQuestions();
  }, [level, capability, skill, confidence]);

  const fetchLevelTwoQuestions = async (
    level: number,
    capability: string,
    skill: number,
    confidence: number
  ) => {
    try {
      const response = await fetch(`/api/questions/level-two`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          level: 7,
          capability: "Building a Team",
          answers: {
            skill: 4,
            confidence: 3,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch level two questions");
      }

      const data = await response.json();
      const questions = data.levelTwoQuestions;
      setQuestions(questions);
      setLoading(false);
      return questions;
    } catch (error) {
      console.error("Error fetching level two questions:", error);
      setError("Failed to load questions. Please try again.");
      setLoading(false);
      return [];
    }
  };

  const handleRatingChange = (rating: number) => {
    const updatedResponses = [...userResponses];
    const existingResponseIndex = updatedResponses.findIndex(
      (response) => response.questionId === questions[currentQuestionIndex].id
    );

    if (existingResponseIndex !== -1) {
      updatedResponses[existingResponseIndex].rating = rating;
    } else {
      updatedResponses.push({
        questionId: questions[currentQuestionIndex].id,
        rating: rating,
        answer: "",
      });
    }

    setUserResponses(updatedResponses);
  };

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const updatedResponses = [...userResponses];
    const existingResponseIndex = updatedResponses.findIndex(
      (response) => response.questionId === questions[currentQuestionIndex].id
    );

    if (existingResponseIndex !== -1) {
      updatedResponses[existingResponseIndex].answer = event.target.value;
    } else {
      updatedResponses.push({
        questionId: questions[currentQuestionIndex].id,
        rating: 0,
        answer: event.target.value,
      });
    }

    setUserResponses(updatedResponses);
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsSubmitting(true);
      try {
        const formattedResponses: AssessmentResponse[] = userResponses.map(
          (response) => ({
            questionId: response.questionId,
            rating: response.rating,
            response: response.answer,
            question: {
              question:
                questions.find((q) => q.id === response.questionId)?.question ||
                "",
            },
            area: capability,
          })
        );

        await onComplete(formattedResponses);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formattedResponses: AssessmentResponse[] = userResponses.map(
        (response) => ({
          questionId: response.questionId,
          rating: response.rating,
          response: response.answer,
          question: {
            question:
              questions.find((q) => q.id === response.questionId)?.question ||
              "",
          },
          area: capability,
        })
      );

      await onComplete(formattedResponses);
    } catch (error) {
      console.error("Error submitting responses:", error);
      toast({
        title: "Error",
        description: "Failed to submit responses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isAllQuestionsAnswered = () => {
    return userResponses.length === questions.length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-600">
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-700">{error}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => window.location.reload()} className="w-full">
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-700">
              No Questions Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-700">
              There are no additional questions for this capability at the
              moment.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentResponse = userResponses.find(
    (response) => response.questionId === currentQuestion.id
  ) || {
    rating: 0,
    answer: "",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e508_1px,transparent_1px),linear-gradient(to_bottom,#4f46e508_1px,transparent_1px)] bg-[size:14px_14px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-950/20 to-transparent" />
      </div>

      <div className="relative min-h-screen py-8 px-4">
        <Card className="w-full max-w-5xl mx-auto bg-slate-900/50 backdrop-blur-sm border border-slate-700">
          <CardHeader className="p-8">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-4xl font-bold text-white mb-2">
                  Level {level} Deep Dive: {capability}
                </CardTitle>
                <CardDescription className="text-lg text-slate-300">
                  Let's explore this area in more detail to help you improve.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
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
                        {currentQuestion.theme.split(":")[0]}
                      </h2>
                    </div>
                    {currentQuestion.theme.split(":")[1] && (
                      <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        {currentQuestion.theme.split(":")[1].trim()}
                      </p>
                    )}
                    <div className="mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-50" />
                  </div>

                  <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-2xl">
                    <p className="text-2xl font-semibold text-white mb-8 leading-relaxed">
                      {currentQuestion.question}
                    </p>

                    <div className="mb-8">
                      <p className="text-lg font-medium text-white mb-4">
                        Rate your experience:
                      </p>
                      <div className="flex items-center justify-center space-x-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button
                            key={star}
                            type="button"
                            onClick={() => handleRatingChange(star)}
                            variant="outline"
                            className={`w-20 h-20 rounded-2xl transition-all duration-500 transform hover:scale-105 ${
                              star <= currentResponse.rating
                                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-none shadow-lg shadow-indigo-500/25"
                                : "border-2 border-indigo-300/20 hover:border-indigo-400/40 bg-white/[0.02]"
                            }`}
                          >
                            <StarIcon
                              className={`w-10 h-10 transition-all duration-500 ${
                                star <= currentResponse.rating
                                  ? "fill-white stroke-none"
                                  : "stroke-indigo-300/60"
                              }`}
                            />
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="answer"
                        className="block text-lg font-medium text-white mb-4"
                      >
                        Your Answer:
                      </label>
                      <Textarea
                        id="answer"
                        value={currentResponse.answer}
                        onChange={handleAnswerChange}
                        placeholder="Share your thoughts and experiences..."
                        className="w-full min-h-[180px] p-6 text-lg rounded-2xl bg-white/[0.02] border-white/10 
                          focus:border-indigo-500/50 focus:ring-indigo-500/50 placeholder:text-slate-500
                          transition-all duration-300 text-white/90"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-12">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                className="flex items-center text-lg px-6 py-3 bg-slate-800/50 border-slate-700 text-slate-200 hover:bg-slate-700/50"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex items-center text-lg px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {currentQuestionIndex === questions.length - 1
                      ? "Completing..."
                      : "Processing..."}
                  </>
                ) : (
                  <>
                    {currentQuestionIndex === questions.length - 1
                      ? "Complete"
                      : "Next"}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
