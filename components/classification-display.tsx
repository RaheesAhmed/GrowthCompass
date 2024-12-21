"use client";

import React from "react";
import {
  CheckCircle,
  Star,
  ArrowRight,
  Users,
  BarChart,
  FileText,
  GitBranch,
  DollarSign,
  GitMerge,
  Target,
  Briefcase,
  Users2,
  TrendingUp,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

interface BudgetInfo {
  hasBudget: "yes" | "no";
  budgetTypes: string[];
  budgetSize: string;
}

interface Context {
  jobFunction: string;
  decisionLevel: string;
  directReports: number;
  hasIndirectReports: string;
  managesBudget: BudgetInfo;
  qualitativeScore: number;
}

interface LeadershipData {
  success: boolean;
  data: {
    level: number;
    role: string;
    description: string;
    versionInfo: {
      v1: string;
      v2: string;
    };
    context: Context;
  };
}

interface LeadershipFormProps {
  leadershipData: LeadershipData;
}

export default function LeadershipForm({
  leadershipData,
}: LeadershipFormProps) {
  const router = useRouter();

  const handleStartAssessment = () => {
    if (leadershipData?.success && leadershipData.data) {
      localStorage.setItem(
        "currentAssessmentData",
        JSON.stringify({
          level: leadershipData.data.level,
          role: leadershipData.data.role,
          responsibilityLevel: leadershipData.data.context.decisionLevel,
          userInfo: {
            name: leadershipData.data.name,
            organization: leadershipData.data.organization,
          },
        })
      );
      router.push("/assessment-choice");
    }
  };

  if (!leadershipData?.success || !leadershipData.data) {
    return null;
  }

  const { data } = leadershipData;

  // Format budget size for display
  const formatBudgetSize = (size: string) => {
    return size.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  // Calculate qualitative score percentage
  const qualitativePercentage = Math.round(data.context.qualitativeScore * 100);

  return (
    <div className="min-h-screen bg-background font-sans flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="enterprise-card p-8 md:p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl opacity-20 -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl opacity-20 -ml-32 -mb-32" />

          <div className="relative">
            {/* Header Section */}
            <div className="text-center space-y-6 mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 border border-primary-100">
                <Star className="h-5 w-5 text-primary-600 mr-2" />
                <span className="text-sm font-semibold text-primary-600">
                  Leadership Assessment Results
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
                <span className="block text-primary-950">Your Leadership</span>
                <span className="block mt-2 enterprise-text">
                  Level {data.level} Profile
                </span>
              </h1>

              {/* Main Cards */}
              <div className="grid md:grid-cols-2 gap-6 mt-12">
                <div className="enterprise-card p-8 transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-primary-50 to-background border border-primary-100">
                  <Users className="h-12 w-12 text-primary-600 mb-4" />
                  <Label className="text-sm font-medium text-surface-600 uppercase tracking-wider">
                    Current Role
                  </Label>
                  <p className="text-3xl font-bold text-primary-950 mt-2 tracking-tight">
                    {data.role}
                  </p>
                  <div className="mt-4 flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-primary-600" />
                    <span className="text-sm text-surface-600">
                      {data.context.jobFunction
                        .replace("_", " ")
                        .charAt(0)
                        .toUpperCase() + data.context.jobFunction.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="enterprise-card p-8 transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-primary-50 to-background border border-primary-100">
                  <BarChart className="h-12 w-12 text-primary-600 mb-4" />
                  <Label className="text-sm font-medium text-surface-600 uppercase tracking-wider">
                    Leadership Level
                  </Label>
                  <div className="flex items-baseline space-x-2 mt-2">
                    <p className="text-6xl font-bold text-primary-950 tracking-tight">
                      {data.level}
                    </p>
                    <span className="text-lg text-surface-600">/9</span>
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-primary-600" />
                    <span className="text-sm text-surface-600">
                      {qualitativePercentage}% Qualitative Score
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-surface-50 border border-surface-100 hover:border-primary-200 transition-colors duration-300">
                  <Target className="h-8 w-8 text-primary-600 mb-2" />
                  <p className="text-lg font-semibold text-primary-950 capitalize">
                    {data.context.decisionLevel} Level
                  </p>
                  <p className="text-sm text-surface-600 mt-1 text-center">
                    Decision Making
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-surface-50 border border-surface-100 hover:border-primary-200 transition-colors duration-300">
                  <Users2 className="h-8 w-8 text-primary-600 mb-2" />
                  <p className="text-lg font-semibold text-primary-950">
                    {data.context.directReports} Direct
                  </p>
                  <p className="text-sm text-surface-600 mt-1 text-center">
                    {data.context.hasIndirectReports === "yes"
                      ? "+ Indirect"
                      : "Reports"}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-surface-50 border border-surface-100 hover:border-primary-200 transition-colors duration-300">
                  <DollarSign className="h-8 w-8 text-primary-600 mb-2" />
                  <p className="text-lg font-semibold text-primary-950">
                    {data.context.managesBudget?.budgetTypes?.[0] ||
                      "Department"}
                  </p>
                  <p className="text-sm text-surface-600 mt-1 text-center">
                    {data.context.managesBudget?.budgetSize
                      ? formatBudgetSize(data.context.managesBudget.budgetSize)
                      : "Budget"}
                  </p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-8 mt-12">
              <div className="enterprise-card p-8 bg-gradient-to-br from-surface-50 to-background border border-surface-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary-50">
                    <FileText className="h-6 w-6 text-primary-600" />
                  </div>
                  <Label className="text-xl font-semibold text-primary-950">
                    Role Description
                  </Label>
                </div>
                <p className="text-surface-600 leading-relaxed text-lg">
                  {data.description}
                </p>
              </div>

              {/* Version Information */}
              <div className="enterprise-card p-8 bg-gradient-to-br from-surface-50 to-background border border-surface-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary-50">
                    <GitBranch className="h-6 w-6 text-primary-600" />
                  </div>
                  <Label className="text-xl font-semibold text-primary-950">
                    Role Evolution
                  </Label>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-primary-600" />
                      <p className="text-primary-600 font-semibold">
                        Version 1.0
                      </p>
                    </div>
                    <p className="text-surface-600 leading-relaxed pl-4 border-l-2 border-primary-100">
                      {data.versionInfo.v1}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-primary-600" />
                      <p className="text-primary-600 font-semibold">
                        Version 2.0
                      </p>
                    </div>
                    <p className="text-surface-600 leading-relaxed pl-4 border-l-2 border-primary-100">
                      {data.versionInfo.v2}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-12 flex justify-center">
              <button
                onClick={handleStartAssessment}
                className="enterprise-button-primary group relative overflow-hidden px-8 py-4 rounded-xl bg-primary-600 hover:bg-primary-700"
              >
                <div className="absolute inset-0 w-3 bg-primary-500 transition-all duration-[400ms] ease-out group-hover:w-full" />
                <span className="relative flex items-center text-lg font-semibold text-white">
                  Continue to Development Plan
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
