"use client";
import React, { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Star,
  Target,
  Users,
  Building,
  Brain,
  Globe,
  CheckCircle,
  Briefcase,
  BarChart,
} from "lucide-react";

interface KnowMoreProps {
  onStartAssessment: () => void;
}

const InteractiveGuide = ({ onStartAssessment }: KnowMoreProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "What does it assess?",
      description:
        "The tool guides you to self-assess, from the perspective of your role-level responsibility, 8 capabilities foundational for leading and managing people effectively.",
      questions: [
        "What are the 8 capabilities?",
        "Who's to say they're foundational?",
        "How do you know they apply to me?",
        "What do you mean by 'role-level responsibility'?",
      ],
      icon: Target,
    },
    {
      title: "Why Leading and Managing?",
      description: '"Leaders don\'t need to manage, but Managers need to Lead"',
      subPoints: [
        "Leadership = Influencing others",
        "Management = Getting work done through others",
        "You'll assess both management capability and leadership capability",
        "Viewed through the lens of being accountable for others' work",
      ],
      icon: Brain,
    },
    {
      title: "Why are they foundational?",
      description:
        "These 8 capabilities are born from 25 years of engagement with leading companies, spanning vibrant startups to major enterprises in various industries, globally.",
      icon: Building,
    },
    {
      title: "How do they apply to all levels?",
      description:
        "Every leader, regardless of their role – whether a Team Lead, Manager, or Senior Director – needs proficiency in these same eight key capabilities. However, how they demonstrate these capabilities differs based on their level of responsibility.",
      example:
        "The way a Sr. Director 'Leads a Team to Get Results' isn't the same as a Manager, reflecting their different roles and responsibilities.",
      icon: Users,
    },
    {
      title: "The 8 Core Capabilities",
      capabilities: [
        "Building a Team",
        "Developing Others",
        "Leading a Team to Get Results",
        "Managing Performance",
        "Managing the Business (Business Acumen)",
        "Personal Development (Your own development)",
        "Communication Skills (for Leaders)",
        "Creating the Environment (Culture and Employee Relations)",
      ],
      icon: BarChart,
    },
    {
      title: "Why is this relevant to you?",
      validationPoints: [
        {
          title: "Expert Consolidation",
          description:
            "Analyzed and classified competency models from 25 years of experience",
        },
        {
          title: "Global Best Practices",
          description: "Derived from top companies worldwide since 1996",
        },
        {
          title: "Cross-Industry Relevance",
          description: "Proven effective across multiple sectors",
        },
        {
          title: "Scalability",
          description: "Relevant for both startups and large enterprises",
        },
      ],
      icon: Globe,
    },
    {
      title: "How the Assessment Works",
      description: "A two-step process designed for your development:",
      steps: [
        "Complete first set of questions reflecting on your capabilities",
        "Decide to explore further if challenged",
        "Skip detailed review if confident",
        "Receive personalized development insights",
      ],
      tip: "Remember: Be honest in your self-assessment. Answer as you are, not as you wish to be.",
      icon: Briefcase,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Grid Background */}
      <div className="relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:14px_14px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Progress Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              />
            </div>
            <div className="text-slate-400 text-sm mt-2">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>

          {/* Content Card */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 min-h-[500px] flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                  {React.createElement(steps[currentStep].icon, {
                    className: "h-6 w-6 text-indigo-400",
                  })}
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {steps[currentStep].title}
                </h2>
              </div>

              {/* Content */}
              <div className="flex-1">
                {steps[currentStep].description && (
                  <p className="text-slate-300 mb-6">
                    {steps[currentStep].description}
                  </p>
                )}

                {steps[currentStep].questions && (
                  <div className="space-y-3">
                    {steps[currentStep].questions.map((question, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-slate-300"
                      >
                        <CheckCircle className="h-5 w-5 text-indigo-400 mt-1 flex-shrink-0" />
                        <span>{question}</span>
                      </div>
                    ))}
                  </div>
                )}

                {steps[currentStep].subPoints && (
                  <div className="space-y-3">
                    {steps[currentStep].subPoints.map((point, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-slate-300"
                      >
                        <div className="w-2 h-2 rounded-full bg-indigo-400" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                )}

                {steps[currentStep].capabilities && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {steps[currentStep].capabilities.map(
                      (capability, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-slate-700/30 p-3 rounded-lg text-slate-300"
                        >
                          <Star className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                          <span>{capability}</span>
                        </div>
                      )
                    )}
                  </div>
                )}

                {steps[currentStep].validationPoints && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {steps[currentStep].validationPoints.map((point, index) => (
                      <div
                        key={index}
                        className="bg-slate-700/30 p-4 rounded-lg"
                      >
                        <h3 className="text-indigo-400 font-semibold mb-2">
                          {point.title}
                        </h3>
                        <p className="text-slate-300 text-sm">
                          {point.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {steps[currentStep].steps && (
                  <div className="space-y-4">
                    {steps[currentStep].steps.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 text-slate-300"
                      >
                        <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
                          {index + 1}
                        </div>
                        <span>{step}</span>
                      </div>
                    ))}
                    {steps[currentStep].tip && (
                      <div className="mt-6 p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                        <p className="text-indigo-300 italic">
                          {steps[currentStep].tip}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
                <button
                  onClick={handlePrevious}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    currentStep === 0
                      ? "text-slate-600 cursor-not-allowed"
                      : "text-slate-300 hover:text-white"
                  }`}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="h-5 w-5" />
                  Previous
                </button>

                {currentStep === steps.length - 1 ? (
                  <button
                    onClick={onStartAssessment}
                    className="inline-flex items-center px-6 py-2 text-base font-medium text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg hover:opacity-90 transition-all"
                  >
                    Start Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white rounded-lg transition-all"
                  >
                    Next
                    <ArrowRight className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveGuide;
