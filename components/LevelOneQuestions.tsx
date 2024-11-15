"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import {
  ChevronLeft,
  ChevronRight,
  Save,
  Clock,
  Star,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import LevelTwoQuestions from "@/components/levelTwoQuestions";
import {
  AreaData,
  LevelTwoQuestion,
  Responses,
  AssessmentResponse,
  LevelOneQuestionsProps,
} from "@/types/level-one";

export const dynamic = "force-dynamic";
export const revalidate = 0; // Disable caching for this page

const LevelTwoPrompt = ({
  onResponse,
}: {
  onResponse: (wantLevelTwo: boolean) => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-lg w-full mx-4 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-4">
          Deep Dive Opportunity
        </h3>
        <p className="text-slate-300 mb-6">
          Based on your responses, we've identified an opportunity for deeper
          insight in this area. Would you like to answer a few additional
          questions to help develop more specific recommendations?
        </p>
        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => onResponse(false)}
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            Skip for now
          </Button>
          <Button
            onClick={() => onResponse(true)}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            Yes, let's dive deeper
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function LevelOneQuestions({
  level,
  userInfo,
  responsibilityLevel,
  onComplete,
}: LevelOneQuestionsProps) {
  const [assessmentData, setAssessmentData] = useState<AreaData[] | null>(null);
  const [levelTwoQuestions, setLevelTwoQuestions] = useState<
    LevelTwoQuestion[]
  >([]);
  const [currentArea, setCurrentArea] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Responses>({});
  const [timeRemaining, setTimeRemaining] = useState(3600);
  const [isLevelTwoVisible, setIsLevelTwoVisible] = useState(false);
  const [showLevelTwoPrompt, setShowLevelTwoPrompt] = useState(false);
  const [wantLevelTwo, setWantLevelTwo] = useState<boolean | null>(null);
  const [plan, setPlan] = useState<any>(null);
  const router = useRouter();

  // Add new state to track completed level two assessments
  const [completedLevelTwo, setCompletedLevelTwo] = useState<Set<string>>(
    new Set()
  );

  // Add new state at the top of the component
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add state for Level Two questions
  const [currentLevelTwoData, setCurrentLevelTwoData] = useState<{
    capability: string;
    skill: number;
    confidence: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/questions/level-one/${level}`);
        const data = await response.json();
        if (!data.levelOneQuestions) {
          throw new Error("Invalid data format");
        }
        setAssessmentData(data.levelOneQuestions);
      } catch (error) {
        console.error("Error fetching assessment data:", error);
        toast({
          title: "Error",
          description: "Failed to load assessment questions. Please try again.",
          variant: "destructive",
        });
      }
    };
    fetchData();
  }, [level]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (field: string, value: string | number) => {
    setResponses((prev) => ({
      ...prev,
      [`${currentArea}-${currentQuestion}-${field}`]: value,
    }));

    const skillRating =
      field === "rating"
        ? Number(value)
        : Number(responses[`${currentArea}-${currentQuestion}-rating`]) || 0;
    const confidenceRating =
      field === "reflectionRating"
        ? Number(value)
        : Number(
            responses[`${currentArea}-${currentQuestion}-reflectionRating`]
          ) || 0;

    if (skillRating > 0 && confidenceRating > 0) {
      if (skillRating >= 4 && confidenceRating >= 3) {
        setShowLevelTwoPrompt(false);
        setIsLevelTwoVisible(false);
      } else {
        setShowLevelTwoPrompt(true);
      }
    }
  };

  const handleWantLevelTwo = (want: boolean) => {
    setWantLevelTwo(want);
    if (want) {
      setIsLevelTwoVisible(true);
      setShowLevelTwoPrompt(false);
    } else {
      // If they don't want level two, move to next question
      if (currentQuestion < assessmentData![currentArea].questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else if (currentArea < assessmentData!.length - 1) {
        setCurrentArea((prev) => prev + 1);
        setCurrentQuestion(0);
      } else {
        onComplete(formatResponsesForSubmission());
      }
    }
  };

  const formatResponsesForSubmission = (): AssessmentResponse[] => {
    if (!assessmentData) return [];

    const levelOneResponses = assessmentData.flatMap((area, areaIndex) =>
      area.questions.map((question, questionIndex) => ({
        rating: Number(responses[`${areaIndex}-${questionIndex}-rating`]) || 0,
        response:
          (responses[`${areaIndex}-${questionIndex}-response`] as string) || "",
        reflectionRating:
          Number(responses[`${areaIndex}-${questionIndex}-reflectionRating`]) ||
          0,
        reflection:
          (responses[`${areaIndex}-${questionIndex}-reflection`] as string) ||
          "",
        question: {
          ratingQuestion: question.ratingQuestion,
          reflection: question.reflection,
        },
        area: area.area,
      }))
    );

    const levelTwoResponses = levelTwoQuestions.map((question, index) => ({
      questionId: question.id,
      response: (responses[`levelTwo-${index}-response`] as string) || "",
      question: {
        question: question.question,
      },
      area: question.capability,
    }));

    return [...levelOneResponses, ...levelTwoResponses];
  };

  // Update the handleSubmitAssessment function
  const handleSubmitAssessment = async () => {
    setIsSubmitting(true);
    try {
      const formattedResponses = formatResponsesForSubmission();
      await onComplete(formattedResponses);
    } catch (error) {
      console.error("Error submitting assessment:", error);
      toast({
        title: "Error",
        description: "Failed to submit assessment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLevelTwoComplete = (responses: AssessmentResponse[]) => {
    // If no responses (no questions available), just continue with level one
    if (responses.length === 0) {
      setIsLevelTwoVisible(false);
      setShowLevelTwoPrompt(false);

      // Move to next question in level one
      if (currentQuestion < assessmentData![currentArea].questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else if (currentArea < assessmentData!.length - 1) {
        setCurrentArea((prev) => prev + 1);
        setCurrentQuestion(0);
      } else {
        onComplete(formatResponsesForSubmission());
      }
      return;
    }

    // Add the current capability to completed level two assessments
    setCompletedLevelTwo(
      (prev) => new Set([...prev, assessmentData![currentArea].area])
    );

    // Save the responses
    const allResponses = formatResponsesForSubmission();
    const updatedResponses = [...allResponses, ...responses];

    // Return to level one questions
    setIsLevelTwoVisible(false);
    setShowLevelTwoPrompt(false);

    // Move to next question in level one
    if (currentQuestion < assessmentData![currentArea].questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else if (currentArea < assessmentData!.length - 1) {
      setCurrentArea((prev) => prev + 1);
      setCurrentQuestion(0);
    } else {
      onComplete(updatedResponses);
    }
  };

  const handleNext = async () => {
    if (!assessmentData) return;

    const skillRating =
      Number(responses[`${currentArea}-${currentQuestion}-rating`]) || 0;
    const confidenceRating =
      Number(responses[`${currentArea}-${currentQuestion}-reflectionRating`]) ||
      0;
    const currentCapability = assessmentData[currentArea].area;

    if (skillRating >= 4 && confidenceRating >= 3) {
      // Good ratings, proceed to next question
      moveToNextQuestion();
    } else if (!completedLevelTwo.has(currentCapability)) {
      // Show prompt instead of directly showing Level Two questions
      setShowLevelTwoPrompt(true);
    } else {
      // Already completed Level Two for this capability
      toast({
        title: "Note",
        description:
          "You've already completed the deep-dive questions for this capability. Moving to the next question.",
      });
      moveToNextQuestion();
    }
  };

  // Helper function to move to next question
  const moveToNextQuestion = () => {
    if (currentQuestion < assessmentData![currentArea].questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else if (currentArea < assessmentData!.length - 1) {
      setCurrentArea((prev) => prev + 1);
      setCurrentQuestion(0);
    } else {
      handleSubmitAssessment();
    }
  };

  const handlePrevious = () => {
    if (!assessmentData) return;

    if (!isLevelTwoVisible) {
      if (currentQuestion > 0) {
        setCurrentQuestion((prev) => prev - 1);
      } else if (currentArea > 0) {
        setCurrentArea((prev) => prev - 1);
        setCurrentQuestion(
          assessmentData[currentArea - 1].questions.length - 1
        );
      }
    } else {
      if (currentQuestion > 0) {
        setCurrentQuestion((prev) => prev - 1);
      } else {
        setIsLevelTwoVisible(false);
        setCurrentArea(assessmentData.length - 1);
        setCurrentQuestion(
          assessmentData[assessmentData.length - 1].questions.length - 1
        );
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const calculateProgress = () => {
    if (!assessmentData || !assessmentData[currentArea]) return 0;

    const totalQuestions =
      assessmentData.reduce((acc, area) => acc + area.questions.length, 0) +
      (isLevelTwoVisible ? levelTwoQuestions.length : 0);

    if (totalQuestions === 0) return 0;

    const answeredQuestions = Object.keys(responses).filter(
      (key) => responses[key] !== ""
    ).length;

    return (answeredQuestions / totalQuestions) * 100;
  };

  const handleSave = () => {
    console.log("Saving responses:", responses);
    toast({
      title: "Progress Saved",
      description: "Your responses have been saved successfully.",
    });
  };

  // Add handler for the prompt response
  const handleLevelTwoPromptResponse = (wantLevelTwo: boolean) => {
    setShowLevelTwoPrompt(false);

    if (wantLevelTwo) {
      const skillRating =
        Number(responses[`${currentArea}-${currentQuestion}-rating`]) || 0;
      const confidenceRating =
        Number(
          responses[`${currentArea}-${currentQuestion}-reflectionRating`]
        ) || 0;
      const currentCapability = assessmentData![currentArea].area;

      setCurrentLevelTwoData({
        capability: currentCapability,
        skill: skillRating,
        confidence: confidenceRating,
      });
      setIsLevelTwoVisible(true);
    } else {
      // User declined, move to next question
      moveToNextQuestion();
    }
  };

  if (!assessmentData || !assessmentData[currentArea]) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading assessment...</span>
        </div>
      </div>
    );
  }

  const renderLevelOneQuestion = () => {
    if (!assessmentData.length) return null;

    const currentAreaData = assessmentData[currentArea];
    const currentQuestionData = currentAreaData.questions[currentQuestion];

    return (
      <div className="space-y-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-sm">
            {currentAreaData.area}
          </h2>
          <div className="mt-2 h-1 w-24 mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-2xl">
          <Label className="text-2xl font-semibold text-white mb-8 block leading-relaxed">
            {currentQuestionData.ratingQuestion.split("\n\n")[0]}
          </Label>

          <div className="flex items-center justify-center space-x-6 mb-8">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                type="button"
                onClick={() => handleInputChange("rating", rating)}
                variant="outline"
                className={`w-20 h-20 rounded-2xl transition-all duration-500 transform hover:scale-105 ${
                  (Number(
                    responses[`${currentArea}-${currentQuestion}-rating`]
                  ) || 0) >= rating
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-none shadow-lg shadow-indigo-500/25"
                    : "border-2 border-indigo-300/20 hover:border-indigo-400/40 bg-white/[0.02]"
                }`}
              >
                <Star
                  className={`w-10 h-10 transition-all duration-500 ${
                    (Number(
                      responses[`${currentArea}-${currentQuestion}-rating`]
                    ) || 0) >= rating
                      ? "fill-white stroke-none"
                      : "stroke-indigo-300/60"
                  }`}
                />
              </Button>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 mb-8 font-medium">
            Rate from 1 (Not Effectively) to 5 (Very Effectively)
          </p>

          <Textarea
            value={
              (responses[
                `${currentArea}-${currentQuestion}-response`
              ] as string) || ""
            }
            onChange={(e) => handleInputChange("response", e.target.value)}
            placeholder="Share your thoughts and experiences..."
            className="w-full min-h-[180px] p-6 text-lg rounded-2xl bg-white/[0.02] border-white/10 
              focus:border-indigo-500/50 focus:ring-indigo-500/50 placeholder:text-slate-500
              transition-all duration-300 text-white/90"
          />
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-2xl">
          <Label className="text-2xl font-semibold text-white mb-8 block leading-relaxed">
            {currentQuestionData.reflection.split("\n\n")[0]}
          </Label>

          <div className="flex items-center justify-center space-x-6 mb-8">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                type="button"
                onClick={() => handleInputChange("reflectionRating", rating)}
                variant="outline"
                className={`w-20 h-20 rounded-2xl transition-all duration-500 transform hover:scale-105 ${
                  (Number(
                    responses[
                      `${currentArea}-${currentQuestion}-reflectionRating`
                    ]
                  ) || 0) >= rating
                    ? "bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white border-none shadow-lg shadow-purple-500/25"
                    : "border-2 border-purple-300/20 hover:border-purple-400/40 bg-white/[0.02]"
                }`}
              >
                <Star
                  className={`w-10 h-10 transition-all duration-500 ${
                    (Number(
                      responses[
                        `${currentArea}-${currentQuestion}-reflectionRating`
                      ]
                    ) || 0) >= rating
                      ? "fill-white stroke-none"
                      : "stroke-purple-300/60"
                  }`}
                />
              </Button>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 mb-8 font-medium">
            Rate from 1 (Not Confident) to 5 (Very Confident)
          </p>

          <Textarea
            value={
              (responses[
                `${currentArea}-${currentQuestion}-reflection`
              ] as string) || ""
            }
            onChange={(e) => handleInputChange("reflection", e.target.value)}
            placeholder="Reflect on your experience..."
            className="w-full min-h-[180px] p-6 text-lg rounded-2xl bg-white/[0.02] border-white/10 
              focus:border-purple-500/50 focus:ring-purple-500/50 placeholder:text-slate-500
              transition-all duration-300 text-white/90"
          />
        </div>
      </div>
    );
  };

  const renderLevelTwoQuestion = () => {
    const currentQuestionData = levelTwoQuestions[currentQuestion];

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-blue-700">
            {currentQuestionData.capability}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-xl font-medium text-gray-900 mb-4 block">
              {currentQuestionData.question}
            </Label>
            <Textarea
              id="levelTwoResponse"
              value={responses[`levelTwo-${currentQuestion}-response`] || ""}
              onChange={(e) =>
                handleInputChange(
                  `levelTwo-${currentQuestion}-response`,
                  e.target.value
                )
              }
              placeholder="Enter your response here"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[150px] text-lg mt-4"
            />
          </div>
          {currentQuestionData.requiresReflection && (
            <div>
              <Label className="text-xl font-medium text-gray-900 mb-4 block">
                Reflect on your response:
              </Label>
              <Textarea
                id="levelTwoReflection"
                value={
                  responses[`levelTwo-${currentQuestion}-reflection`] || ""
                }
                onChange={(e) =>
                  handleInputChange(
                    `levelTwo-${currentQuestion}-reflection`,
                    e.target.value
                  )
                }
                placeholder="Enter your reflection here"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[150px] text-lg"
              />
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {showLevelTwoPrompt && (
        <LevelTwoPrompt onResponse={handleLevelTwoPromptResponse} />
      )}

      {isLevelTwoVisible && currentLevelTwoData ? (
        <LevelTwoQuestions
          level={level}
          capability={currentLevelTwoData.capability}
          skill={currentLevelTwoData.skill}
          confidence={currentLevelTwoData.confidence}
          onComplete={handleLevelTwoComplete}
        />
      ) : (
        <Card className="w-full max-w-5xl mx-auto bg-slate-900/50 backdrop-blur-sm border border-slate-700">
          <CardHeader className="p-8">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-4xl font-bold text-white mb-2">
                  Leadership Assessment
                </CardTitle>
                <CardDescription className="text-lg text-slate-300">
                  {isLevelTwoVisible
                    ? "Deep Dive Questions"
                    : "Assess your leadership capabilities and identify areas for growth"}
                </CardDescription>
              </div>
              <div className="flex items-center bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700">
                <Clock className="w-6 h-6 text-slate-300 mr-2" />
                <span className="text-xl font-medium text-white">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <div className="mb-12">
              <Progress
                value={calculateProgress()}
                className="h-3 bg-slate-800"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-slate-400">
                  Progress: {Math.round(calculateProgress())}% complete
                </p>
                <p className="text-sm text-slate-400">
                  Question {currentQuestion + 1} of{" "}
                  {assessmentData && assessmentData[currentArea]
                    ? assessmentData[currentArea].questions.length
                    : 0}
                </p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentArea}-${currentQuestion}-${isLevelTwoVisible}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {isLevelTwoVisible
                  ? renderLevelTwoQuestion()
                  : renderLevelOneQuestion()}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-12">
              <Button
                onClick={handlePrevious}
                disabled={
                  currentArea === 0 &&
                  currentQuestion === 0 &&
                  !isLevelTwoVisible
                }
                variant="outline"
                className="flex items-center text-lg px-6 py-3 bg-slate-800/50 border-slate-700 text-slate-200 hover:bg-slate-700/50"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </Button>

              <Button
                onClick={handleSave}
                variant="outline"
                className="flex items-center text-lg px-6 py-3 bg-slate-800/50 border-slate-700 text-slate-200 hover:bg-slate-700/50"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Progress
              </Button>

              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex items-center text-lg px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {(isLevelTwoVisible &&
                      currentQuestion === levelTwoQuestions.length - 1) ||
                    (!isLevelTwoVisible &&
                      currentArea === assessmentData.length - 1 &&
                      currentQuestion ===
                        assessmentData[currentArea].questions.length - 1)
                      ? "Complete"
                      : "Next"}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
