"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Star,
  User,
  Building2,
  Users2,
  Network,
  Briefcase,
  LineChart,
  ClipboardList,
  Target,
  FileText,
  GitBranch,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Question } from "@/types/demographic";
import LeadershipForm from "@/components/classification-display";
import { LeadershipData } from "@/types/leadership";
import { useToast } from "@/hooks/use-toast";
import JourneyText from "@/components/JourneyText";
import { DemographicQuestions } from "@/utils/demographic_questions";

interface FormData {
  [key: string]: string | number | boolean | undefined;
  typicalProject?: string;
  primaryResponsibilities?: string;
}

const questionIcons: { [key: string]: any } = {
  name: User,
  industry: Building2,
  employeeCount: Users2,
  department: Network,
  jobTitle: Briefcase,
  jobFunction: Star,
  primaryResponsibilities: FileText,
  directReports: Users2,
  reportingRoles: LineChart,
  hasIndirectReports: GitBranch,
  decisionLevel: Target,
  typicalProject: ClipboardList,
  levelsToCEO: GitBranch,
  managesBudget: Wallet,
};

export default function DemographicForm() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(-1);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadershipData, setLeadershipData] = useState<LeadershipData | null>(
    null
  );
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const loadedQuestions = await DemographicQuestions();
        setQuestions(loadedQuestions);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading questions:", error);
        toast({
          title: "Error",
          description: "Failed to load questions. Please refresh the page.",
          variant: "destructive",
        });
      }
    };
    loadQuestions();
  }, [toast]);

  useEffect(() => {
    if (questions.length > 0) {
      const answeredQuestions = questions.filter((q) =>
        isQuestionAnswered(q.id)
      );
      const newProgress = (answeredQuestions.length / questions.length) * 100;
      setProgress(newProgress);
    }
  }, [formData, questions]);

  const isQuestionAnswered = (questionId: string): boolean => {
    const value = formData[questionId];

    if (value === undefined || value === "") return false;
    if (typeof value === "string" && value.trim() === "") return false;
    if (Array.isArray(value) && value.length === 0) return false;

    // For multipart questions
    if (questionId === "managesBudget") {
      const hasBudget = formData.hasBudget;
      if (hasBudget === "yes") {
        return Boolean(
          formData.budgetTypes &&
            Array.isArray(formData.budgetTypes) &&
            formData.budgetTypes.length > 0
        );
      }
      return hasBudget === "no";
    }

    return true;
  };

  const handleInputChange = (id: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (isLoading || !questions[currentStep]) return;

    const currentQuestion = questions[currentStep];
    if (!isQuestionAnswered(currentQuestion.id)) {
      toast({
        title: "Required Field",
        description: "Please answer this question before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    // Check if all required questions are answered
    const unansweredQuestions = questions.filter((q) => {
      if (q.type === "multipart" && q.parts) {
        // For multipart questions, check each visible part
        return q.parts.some((part) => {
          const shouldShow = part.dependsOn
            ? formData[part.dependsOn] === part.showWhen
            : true;
          return shouldShow && part.required && !isQuestionAnswered(part.id);
        });
      }
      return q.required && !isQuestionAnswered(q.id);
    });

    if (unansweredQuestions.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please answer all required questions before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/classification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          // Ensure multipart questions are properly formatted
          managesBudget: formData.managesBudget
            ? {
                hasBudget: formData.hasBudget,
                budgetTypes: formData.budgetTypes || [],
                budgetSize: formData.budgetSize || "",
              }
            : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.success) {
        setLeadershipData(responseData);
      } else {
        throw new Error(responseData.message || "Failed to process assessment");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestion = (question: Question) => {
    const IconComponent = questionIcons[question.id] || ClipboardList;

    const questionHeader = (
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 rounded-xl bg-primary-50 border border-primary-100">
          <IconComponent className="h-6 w-6 text-primary-600" />
        </div>
        <Label
          htmlFor={question.id}
          className="text-xl font-semibold text-primary-950"
        >
          {question.question}
        </Label>
      </div>
    );

    const inputClasses =
      "bg-background border-surface-200 text-primary-950 placeholder-surface-400 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200";
    const helperTextClasses = "mt-2 text-sm text-surface-600 italic";

    switch (question.type) {
      case "text":
      case "number":
        return (
          <div className="space-y-4 transform transition-all duration-300 hover:translate-y-[-2px]">
            {questionHeader}
            <div className="relative">
              <Input
                id={question.id}
                type={question.type}
                placeholder={question.placeholder}
                value={String(formData[question.id] || "")}
                onChange={(e) =>
                  handleInputChange(
                    question.id,
                    question.type === "number"
                      ? Number(e.target.value)
                      : e.target.value
                  )
                }
                className={`${inputClasses} pl-4 pr-4 py-3 text-lg`}
                autoComplete="off"
                min={question.min}
                minLength={question.minLength}
              />
            </div>
            {question.helperText && (
              <p className={helperTextClasses}>{question.helperText}</p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div className="space-y-4 transform transition-all duration-300 hover:translate-y-[-2px]">
            {questionHeader}
            <div className="relative">
              <Textarea
                id={question.id}
                placeholder={question.placeholder}
                value={String(formData[question.id] || "")}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
                className={`${inputClasses} min-h-[150px] p-4 text-lg resize-none`}
                minLength={question.minLength}
              />
            </div>
            {question.helperText && (
              <p className={helperTextClasses}>{question.helperText}</p>
            )}
            {question.minLength &&
              formData[question.id] &&
              String(formData[question.id]).length < question.minLength && (
                <p className="text-sm text-red-400 flex items-center mt-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 mr-2" />
                  Please provide at least {question.minLength} characters
                </p>
              )}
          </div>
        );

      case "radio":
        return (
          <div className="space-y-4 transform transition-all duration-300 hover:translate-y-[-2px]">
            {questionHeader}
            <div className="space-y-4">
              {question.options?.map((option) => (
                <div
                  key={option.value}
                  className={`relative flex items-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    formData[question.id] === option.value
                      ? "border-primary-500 bg-primary-50"
                      : "border-surface-200 hover:border-primary-200"
                  }`}
                  onClick={() => handleInputChange(question.id, option.value)}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                      formData[question.id] === option.value
                        ? "border-primary-500"
                        : "border-surface-300"
                    }`}
                  >
                    {formData[question.id] === option.value && (
                      <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-primary-950">
                      {option.label}
                    </p>
                    {option.description && (
                      <p className="text-sm text-surface-600 mt-1">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "toggle":
        return (
          <div className="space-y-4 transform transition-all duration-300 hover:translate-y-[-2px]">
            {questionHeader}
            <div className="space-y-4">
              {question.options?.map((option) => (
                <div
                  key={option.value}
                  className={`relative flex items-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    formData[question.id] === option.value
                      ? "border-primary-500 bg-primary-50"
                      : "border-surface-200 hover:border-primary-200"
                  }`}
                  onClick={() => handleInputChange(question.id, option.value)}
                >
                  <div
                    className={`w-5 h-5 rounded-lg border-2 mr-4 flex items-center justify-center ${
                      formData[question.id] === option.value
                        ? "border-primary-500 bg-primary-500"
                        : "border-surface-300"
                    }`}
                  >
                    {formData[question.id] === option.value && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-primary-950">
                      {option.label}
                    </p>
                    {option.description && (
                      <p className="text-sm text-surface-600 mt-1">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "multipart":
        if (!question.parts) return null;

        return (
          <div className="space-y-6 transform transition-all duration-300 hover:translate-y-[-2px]">
            {questionHeader}
            {question.parts.map((part, index) => {
              const shouldShow = part.dependsOn
                ? formData[part.dependsOn] === part.showWhen
                : true;

              if (!shouldShow) return null;

              return (
                <div key={part.id} className="space-y-4">
                  {part.question && (
                    <Label className="text-lg font-medium text-primary-950">
                      {part.question}
                    </Label>
                  )}
                  {part.type === "radio" && (
                    <div className="space-y-3">
                      {part.options?.map((option) => (
                        <div
                          key={option.value}
                          className={`relative flex items-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                            formData[part.id] === option.value
                              ? "border-primary-500 bg-primary-50"
                              : "border-surface-200 hover:border-primary-200"
                          }`}
                          onClick={() =>
                            handleInputChange(part.id, option.value)
                          }
                        >
                          <div
                            className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                              formData[part.id] === option.value
                                ? "border-primary-500"
                                : "border-surface-300"
                            }`}
                          >
                            {formData[part.id] === option.value && (
                              <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                            )}
                          </div>
                          <p className="font-medium text-primary-950">
                            {option.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  {part.type === "checkbox" && (
                    <div className="space-y-3">
                      {part.options?.map((option) => {
                        const isChecked = Array.isArray(formData[part.id])
                          ? (formData[part.id] as string[]).includes(
                              option.value
                            )
                          : false;

                        return (
                          <div
                            key={option.value}
                            className={`relative flex items-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                              isChecked
                                ? "border-primary-500 bg-primary-50"
                                : "border-surface-200 hover:border-primary-200"
                            }`}
                            onClick={() => {
                              const currentValues = Array.isArray(
                                formData[part.id]
                              )
                                ? (formData[part.id] as string[])
                                : [];
                              const newValues = isChecked
                                ? currentValues.filter(
                                    (v) => v !== option.value
                                  )
                                : [...currentValues, option.value];
                              handleInputChange(part.id, newValues);
                            }}
                          >
                            <div
                              className={`w-5 h-5 rounded-md border-2 mr-4 flex items-center justify-center ${
                                isChecked
                                  ? "border-primary-500 bg-primary-500"
                                  : "border-surface-300"
                              }`}
                            >
                              {isChecked && (
                                <CheckCircle className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-primary-950">
                                {option.label}
                              </p>
                              {option.description && (
                                <p className="text-sm text-surface-600 mt-1">
                                  {option.description}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {part.type === "text" && (
                    <Input
                      id={part.id}
                      type="text"
                      placeholder={part.placeholder}
                      value={String(formData[part.id] || "")}
                      onChange={(e) =>
                        handleInputChange(part.id, e.target.value)
                      }
                      className={`${inputClasses} pl-4 pr-4 py-3 text-lg`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background font-sans flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50">
            <svg
              className="animate-spin h-8 w-8 text-primary-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <p className="text-surface-600 text-lg">Loading your assessment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans flex items-center justify-center py-10">
      {currentStep === -1 ? (
        <div className="w-full relative px-4">
          <div className="relative max-w-4xl mx-auto">
            <JourneyText />
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setCurrentStep(0)}
                className="enterprise-button-primary group"
              >
                <span className="relative flex items-center">
                  Begin Your Leadership Journey
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : !leadershipData ? (
        <div className="relative w-full max-w-3xl mx-auto px-4">
          <div className="relative">
            <div className="text-center space-y-6 mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 border border-primary-100">
                <Star className="h-5 w-5 text-primary-600 mr-2" />
                <span className="text-sm font-medium text-primary-600">
                  Question {currentStep + 1} of {questions.length}
                </span>
              </div>

              <div className="relative">
                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-primary-950">
                  Leadership Assessment
                </h1>
              </div>

              <p className="text-lg text-surface-600 max-w-xl mx-auto">
                Shape your leadership journey with precise insights tailored to
                your role.
              </p>

              <div className="w-full bg-surface-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-primary-600 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-surface-500">
                {Math.round(progress)}% Complete
              </p>
            </div>

            <div className="enterprise-card p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {questions[currentStep] &&
                  renderQuestion(questions[currentStep])}

                <div className="flex justify-between pt-8">
                  <Button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="enterprise-button-secondary"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
                    Previous
                  </Button>

                  {currentStep === questions.length - 1 ? (
                    <Button
                      type="submit"
                      className="enterprise-button-primary"
                      disabled={isSubmitting}
                    >
                      <span className="relative flex items-center">
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            Complete Assessment
                            <CheckCircle className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                          </>
                        )}
                      </span>
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="enterprise-button-primary"
                    >
                      <span className="relative flex items-center">
                        Next Question
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <LeadershipForm leadershipData={leadershipData} />
      )}
    </div>
  );
}
