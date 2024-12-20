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
  ArrowUpRight,
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
    <div className="min-h-screen bg-background">
      <div className="relative">
        {/* Enterprise Grid Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:14px_14px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-surface-50/20 to-background" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Progress Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-surface-600">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium text-surface-600">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-surface-100 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-500 enterprise-gradient"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Content Card */}
          <div className="max-w-3xl mx-auto">
            <div className="enterprise-card min-h-[600px] flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-6 mb-8 p-8 border-b border-surface-200">
                <div className="w-14 h-14 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center">
                  {React.createElement(steps[currentStep].icon, {
                    className: "h-7 w-7 text-primary-600",
                  })}
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-primary-950">
                  {steps[currentStep].title}
                </h2>
              </div>

              {/* Content */}
              <div className="flex-1 px-8">
                {steps[currentStep].description && (
                  <p className="text-lg text-surface-700 mb-8">
                    {steps[currentStep].description}
                  </p>
                )}

                {steps[currentStep].questions && (
                  <div className="space-y-4">
                    {steps[currentStep].questions.map((question, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-lg bg-surface-50 border border-surface-200 transition-all hover:bg-surface-100"
                      >
                        <CheckCircle className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                        <span className="text-surface-700">{question}</span>
                      </div>
                    ))}
                  </div>
                )}

                {steps[currentStep].subPoints && (
                  <div className="space-y-4">
                    {steps[currentStep].subPoints.map((point, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-lg bg-surface-50 border border-surface-200"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary-600" />
                        <span className="text-surface-700">{point}</span>
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
                          className="flex items-center gap-3 p-4 rounded-lg bg-surface-50 border border-surface-200 transition-all hover:bg-surface-100"
                        >
                          <Star className="h-5 w-5 text-primary-600 flex-shrink-0" />
                          <span className="text-surface-700">{capability}</span>
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
                        className="p-6 rounded-lg bg-surface-50 border border-surface-200 transition-all hover:bg-surface-100"
                      >
                        <h3 className="text-primary-600 font-semibold mb-2 flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          {point.title}
                        </h3>
                        <p className="text-surface-600 text-sm">
                          {point.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {steps[currentStep].steps && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {steps[currentStep].steps.map((step, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 rounded-lg bg-surface-50 border border-surface-200"
                        >
                          <div className="w-8 h-8 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 font-medium">
                            {index + 1}
                          </div>
                          <span className="text-surface-700">{step}</span>
                        </div>
                      ))}
                    </div>
                    {steps[currentStep].tip && (
                      <div className="p-4 rounded-lg bg-primary-50 border border-primary-100">
                        <p className="text-primary-700 italic">
                          {steps[currentStep].tip}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 p-8 border-t border-surface-200">
                <button
                  onClick={handlePrevious}
                  className={`enterprise-button-secondary ${
                    currentStep === 0
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-surface-100"
                  }`}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Previous
                </button>

                {currentStep === steps.length - 1 ? (
                  <button
                    onClick={onStartAssessment}
                    className="enterprise-button-primary group"
                  >
                    Start Assessment
                    <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="enterprise-button-primary group"
                  >
                    Next
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
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
