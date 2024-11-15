"use client";

import React, { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle, Star } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { Question } from "@/types/demographic";
import LeadershipForm from "@/components/classification-display";
import { LeadershipData } from "@/types/leadership";

const questions: Question[] = [
  {
    id: "name",
    type: "text",
    question: "Please enter what name you'd like to use in your report.",
    placeholder: "Enter your name",
  },
  {
    id: "industry",
    type: "text",
    question: "What industry is your business in?",
    placeholder: "e.g., Healthcare, Technology, Manufacturing, Education",
    helperText:
      "Please specify the industry your organization operates within.",
  },
  {
    id: "employeeCount",
    type: "number",
    question: "How many people work at your company?",
    placeholder: "e.g., 500",
    helperText:
      "Please enter the total number of employees in your entire organization.",
  },
  {
    id: "department",
    type: "text",
    question:
      "What department or division do you primarily work in within your organization?",
    placeholder: "e.g., Finance, Western Region Operations, Company-wide",
    helperText:
      "For those with broader responsibilities, such as overseeing multiple areas or the entire organization, indicate the most encompassing area.",
  },
  {
    id: "jobTitle",
    type: "text",
    question: "What is your job title?",
    placeholder: "Enter your exact title as used in your workplace",
  },
  {
    id: "directReports",
    type: "number",
    question: "How many people report directly to you?",
    placeholder: "Enter a number (0 if none)",
    helperText: "If none, enter '0'",
  },
  {
    id: "reportingRoles",
    type: "text",
    question: "What types of roles report directly to you? Please list them.",
    placeholder: "e.g., Manager of Engineering, Sales Coordinator",
    helperText: "If none, please state 'None'",
  },
  {
    id: "decisionLevel",
    type: "select",
    question:
      "What level of decisions do you primarily make? (Please select the most appropriate option)",
    options: [
      {
        value: "operational",
        label: "Operational",
        description:
          "Day-to-day decisions within your specific role, like processing invoices, responding to customer queries, or maintaining records",
      },
      {
        value: "tactical",
        label: "Tactical",
        description:
          "Medium-term decisions affecting your team or department, such as improving workflow efficiency or determining project timelines",
      },
      {
        value: "strategic",
        label: "Strategic",
        description:
          "Long-term decisions that shape major aspects of the organization, such as developing new company-wide programs, setting overarching business strategies, or leading major organizational changes",
      },
    ],
  },
  {
    id: "typicalProject",
    type: "textarea",
    question: "Describe a typical project or task you are responsible for.",
    placeholder:
      "Please include details about what the task involves, any teams or departments you interact with, and its impact on your organization",
    helperText:
      "Example: 'I develop IT security policies that align with company-wide risk management strategies and coordinate with the legal and tech departments to implement them.'",
  },
  {
    id: "levelsToCEO",
    type: "number",
    question:
      "How many levels are there between you and the highest-ranking executive in your organization?",
    placeholder: "Enter a number",
    helperText:
      "Count the layers of management from you to the CEO or equivalent. Example: If you report to a Manager, who reports to a VP, who reports to the CEO, you would enter '3'.",
  },
  {
    id: "managesBudget",
    type: "boolean",
    question: "Does your role require you to manage a budget?",
    additionalInfo: {
      question:
        "If yes, please specify whether it is for your department only or if it spans multiple departments.",
      placeholder:
        "e.g., Yes, I manage the budget for the entire marketing department",
    },
  },
];

interface FormData {
  [key: string]: string | number | boolean | undefined;
  typicalProject?: string;
  "managesBudget-additional"?: string;
}

export default function DemographicForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadershipData, setLeadershipData] = useState<LeadershipData | null>(
    null
  );

  const handleInputChange = (id: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateInput = (question: Question) => {
    if (question.type === "boolean") {
      return typeof formData[question.id] === "boolean";
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.decisionLevel) {
      console.error("Please select a decision level");
      return;
    }

    const isValid = questions.every((question) => validateInput(question));

    if (
      !formData.typicalProject ||
      String(formData.typicalProject).length < 20
    ) {
      console.error(
        "Typical project description must be at least 20 characters"
      );
      return;
    }

    if (isValid) {
      setIsSubmitting(true);
      try {
        const preparedData = {
          name: String(formData.name || ""),
          industry: String(formData.industry || ""),
          companySize: Number(formData.employeeCount) || 0,
          department: String(formData.department || ""),
          jobTitle: String(formData.jobTitle || ""),
          directReports: Number(formData.directReports) || 0,
          reportingRoles: String(formData.reportingRoles || ""),
          decisionLevel:
            String(formData.decisionLevel || "").toLowerCase() === "operational"
              ? "Operational"
              : String(formData.decisionLevel || "").toLowerCase() ===
                "tactical"
              ? "Tactical"
              : "Strategic",
          typicalProject: String(formData.typicalProject || ""),
          levelsToCEO: Number(formData.levelsToCEO) || 0,
          managesBudget: Boolean(formData.managesBudget),
        };

        const response = await fetch("/api/classification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(preparedData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("Form submitted successfully");
          console.log(responseData);
          setLeadershipData(responseData);
        } else {
          console.error("Form submission failed");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "text":
      case "number":
        return (
          <div className="space-y-2">
            <Label
              htmlFor={question.id}
              className="text-lg font-medium text-white"
            >
              {question.question}
            </Label>
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
              className="bg-white/10 border-white/20 text-white placeholder-white/50"
            />
            {question.helperText && (
              <p className="text-sm text-white/70">{question.helperText}</p>
            )}
          </div>
        );
      case "textarea":
        return (
          <div className="space-y-2">
            <Label
              htmlFor={question.id}
              className="text-lg font-medium text-white"
            >
              {question.question}
            </Label>
            <Textarea
              id={question.id}
              placeholder={question.placeholder}
              value={String(formData[question.id] || "")}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-white/50"
            />
            {question.helperText && (
              <p className="text-sm text-white/70">{question.helperText}</p>
            )}
            {question.id === "typicalProject" &&
              formData.typicalProject &&
              String(formData.typicalProject).length < 20 && (
                <p className="text-sm text-red-400">
                  Please provide at least 20 characters for your project
                  description
                </p>
              )}
          </div>
        );
      case "select":
        return (
          <div className="space-y-2">
            <Label className="text-lg font-medium text-white">
              {question.question}
            </Label>
            <Select
              onValueChange={(value) => handleInputChange(question.id, value)}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {question.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {question.options?.map((option) => (
              <p key={option.value} className="text-sm text-white/70">
                <strong>{option.label}:</strong> {option.description}
              </p>
            ))}
          </div>
        );
      case "boolean":
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id={question.id}
                checked={!!formData[question.id]}
                onCheckedChange={(checked) =>
                  handleInputChange(question.id, checked)
                }
              />
              <Label
                htmlFor={question.id}
                className="text-lg font-medium text-white"
              >
                {question.question}
              </Label>
            </div>
            {formData[question.id] && question.additionalInfo && (
              <div className="space-y-2">
                <Label
                  htmlFor={`${question.id}-additional`}
                  className="text-lg font-medium text-white"
                >
                  {question.additionalInfo.question}
                </Label>
                <Input
                  id={`${question.id}-additional`}
                  placeholder={question.additionalInfo.placeholder}
                  value={String(formData[`${question.id}-additional`] || "")}
                  onChange={(e) =>
                    handleInputChange(
                      `${question.id}-additional`,
                      e.target.value
                    )
                  }
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-['Inter'] flex items-center justify-center">
      {!leadershipData ? (
        <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:14px_14px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900" />
          </div>

          <div className="relative z-10">
            <div className="text-center space-y-4 mb-8">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20">
                <Star className="h-4 w-4 text-indigo-400 mr-2" />
                <span className="text-sm font-medium text-indigo-300">
                  Demographic Information
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                <span className="block text-white">Tell Us About</span>
                <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                  Your Leadership
                </span>
              </h1>

              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Help us tailor your leadership assessment by providing some
                information about your role and responsibilities.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                {renderQuestion(questions[currentStep])}

                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    variant="outline"
                    className="text-black border-white/20 hover:bg-white/10"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Previous
                  </Button>
                  {currentStep === questions.length - 1 ? (
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                      disabled={isSubmitting}
                    >
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
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit
                          <CheckCircle className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                    >
                      Next
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  )}
                </div>
              </form>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-400">
                Step {currentStep + 1} of {questions.length}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <LeadershipForm leadershipData={leadershipData} />
      )}
    </div>
  );
}
