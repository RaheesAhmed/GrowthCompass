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
  Info,
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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="enterprise-card max-w-lg w-full mx-4">
        <div className="p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center flex-shrink-0">
              <Info className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-primary-950 mb-2">
                Deep Dive Opportunity
              </h3>
              <p className="text-surface-600">
                Based on your responses, we've identified an opportunity for
                deeper insight in this area. Would you like to answer a few
                additional questions to help develop more specific
                recommendations?
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-surface-200">
            <Button
              variant="outline"
              onClick={() => onResponse(false)}
              className="enterprise-button-secondary"
            >
              Skip for now
            </Button>
            <Button
              onClick={() => onResponse(true)}
              className="enterprise-button-primary"
            >
              Yes, let's dive deeper
            </Button>
          </div>
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
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-primary-950">
            {currentAreaData.area}
          </h2>
          <div className="mt-2 h-0.5 w-20 mx-auto bg-primary-200" />
        </div>

        {/* Rating Question Section */}
        <div className="enterprise-card">
          <div className="p-8 space-y-8">
            {/* Main Rating Question */}
            <div className="space-y-4">
              <h3 className="text-2xl font-medium text-primary-950">
                Rate Your Effectiveness
              </h3>
              <p className="text-surface-600">
                Consider your role in leading your team – from distributing
                tasks fairly, supporting team members' growth, to ensuring good
                teamwork.
              </p>
              <p className="text-surface-600">
                Rate your effectiveness from{" "}
                <span className="text-primary-600 font-medium">
                  1 (Not Effective)
                </span>{" "}
                to{" "}
                <span className="text-primary-600 font-medium">
                  5 (Highly Effective)
                </span>
              </p>
            </div>

            {/* Rating Stars */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    type="button"
                    onClick={() => handleInputChange("rating", rating)}
                    variant="outline"
                    className={`w-14 h-14 rounded-xl transition-all duration-300 ${
                      (Number(
                        responses[`${currentArea}-${currentQuestion}-rating`]
                      ) || 0) >= rating
                        ? "bg-primary-600 text-white border-primary-600 hover:bg-primary-700"
                        : "border-2 border-surface-200 hover:border-primary-200 bg-surface-50"
                    }`}
                  >
                    <Star
                      className={`w-6 h-6 transition-all duration-300 ${
                        (Number(
                          responses[`${currentArea}-${currentQuestion}-rating`]
                        ) || 0) >= rating
                          ? "fill-white stroke-none"
                          : "stroke-surface-400"
                      }`}
                    />
                  </Button>
                ))}
              </div>
              <div className="flex justify-center items-center gap-4 text-sm font-medium">
                <span className="text-surface-600">Not Effectively</span>
                <span className="text-surface-400">→</span>
                <span className="text-surface-600">Very Effectively</span>
              </div>
            </div>

            {/* Context Information */}
            <div className="bg-surface-50 rounded-xl p-6 border border-surface-200">
              <p className="text-surface-600">
                {currentQuestionData.ratingQuestion.split("\n\n")[1]}
              </p>
            </div>

            {/* Response Section */}
            <div className="space-y-4">
              <Label className="text-lg font-medium text-primary-950">
                Share your thoughts and experiences:
              </Label>
              <Textarea
                value={
                  (responses[
                    `${currentArea}-${currentQuestion}-response`
                  ] as string) || ""
                }
                onChange={(e) => handleInputChange("response", e.target.value)}
                placeholder="Describe your experiences and provide specific examples..."
                className="min-h-[180px] enterprise-textarea"
              />
            </div>
          </div>
        </div>

        {/* Reflection Section */}
        <div className="enterprise-card">
          <div className="p-8 space-y-8">
            {/* Main Reflection Question */}
            <div className="space-y-4">
              <h3 className="text-2xl font-medium text-primary-950">
                Rate Your Confidence
              </h3>
              <p className="text-surface-600">
                How confident do you feel in your ability to lead your team
                effectively?
              </p>
              <p className="text-surface-600">
                Rate from{" "}
                <span className="text-primary-600 font-medium">
                  1 (Not Confident)
                </span>{" "}
                to{" "}
                <span className="text-primary-600 font-medium">
                  5 (Very Confident)
                </span>
              </p>
            </div>

            {/* Rating Stars */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    type="button"
                    onClick={() =>
                      handleInputChange("reflectionRating", rating)
                    }
                    variant="outline"
                    className={`w-14 h-14 rounded-xl transition-all duration-300 ${
                      (Number(
                        responses[
                          `${currentArea}-${currentQuestion}-reflectionRating`
                        ]
                      ) || 0) >= rating
                        ? "bg-primary-600 text-white border-primary-600 hover:bg-primary-700"
                        : "border-2 border-surface-200 hover:border-primary-200 bg-surface-50"
                    }`}
                  >
                    <Star
                      className={`w-6 h-6 transition-all duration-300 ${
                        (Number(
                          responses[
                            `${currentArea}-${currentQuestion}-reflectionRating`
                          ]
                        ) || 0) >= rating
                          ? "fill-white stroke-none"
                          : "stroke-surface-400"
                      }`}
                    />
                  </Button>
                ))}
              </div>
              <div className="flex justify-center items-center gap-4 text-sm font-medium">
                <span className="text-surface-600">Not Confident</span>
                <span className="text-surface-400">→</span>
                <span className="text-surface-600">Very Confident</span>
              </div>
            </div>

            {/* Context Information */}
            <div className="bg-surface-50 rounded-xl p-6 border border-surface-200">
              <p className="text-surface-600">
                {currentQuestionData.reflection.split("\n\n")[1]}
              </p>
            </div>

            {/* Response Section */}
            <div className="space-y-4">
              <Label className="text-lg font-medium text-primary-950">
                Share your reflection:
              </Label>
              <Textarea
                value={
                  (responses[
                    `${currentArea}-${currentQuestion}-reflection`
                  ] as string) || ""
                }
                onChange={(e) =>
                  handleInputChange("reflection", e.target.value)
                }
                placeholder="Reflect on your experiences and areas for growth..."
                className="min-h-[180px] enterprise-textarea"
              />
            </div>
          </div>
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
    <div className="min-h-screen bg-background">
      {/* Enterprise Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:14px_14px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface-50/20 to-background" />
      </div>

      <div className="relative">
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
          <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="enterprise-card mb-8">
              <div className="p-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-semibold text-primary-950 mb-2">
                      Leadership Assessment
                    </h1>
                    <p className="text-lg text-surface-600">
                      Assess your leadership capabilities and identify areas for
                      growth
                    </p>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-surface-50 border border-surface-200">
                    <Clock className="w-5 h-5 text-primary-600" />
                    <span className="text-lg font-medium text-primary-950">
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-surface-600">
                      Progress: {Math.round(calculateProgress())}% complete
                    </p>
                    <p className="text-sm font-medium text-surface-600">
                      Question {currentQuestion + 1} of{" "}
                      {assessmentData[currentArea].questions.length}
                    </p>
                  </div>
                  <Progress
                    value={calculateProgress()}
                    className="h-2 enterprise-progress"
                  />
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentArea}-${currentQuestion}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderLevelOneQuestion()}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center mt-8">
              <Button
                onClick={handlePrevious}
                disabled={currentArea === 0 && currentQuestion === 0}
                className="enterprise-button-secondary"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </Button>

              <Button
                onClick={handleSave}
                className="enterprise-button-secondary"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Progress
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
                      {currentArea === assessmentData.length - 1 &&
                      currentQuestion ===
                        assessmentData[currentArea].questions.length - 1
                        ? "Complete"
                        : "Next"}
                    </span>
                    <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
