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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface LeadershipData {
  data: {
    role: string;
    responsibilityLevel: number;
    description: string;
    versionInfo: {
      "v1.0": string;
      "v2.0": string;
    };
  };
  success: boolean;
}

interface LeadershipFormProps {
  leadershipData: LeadershipData;
}

export default function LeadershipForm({
  leadershipData,
}: LeadershipFormProps) {
  if (!leadershipData || !leadershipData.data) {
    return null;
  }

  console.log(leadershipData.data.versionInfo);

  return (
    <div className="min-h-screen bg-slate-900 font-['Inter'] flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:14px_14px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900" />
        </div>

        <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-indigo-500/30">
              <Star className="h-5 w-5 text-indigo-400 mr-2" />
              <span className="text-sm font-semibold text-indigo-300">
                Leadership Profile
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              <span className="block text-white">Your Leadership</span>
              <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Journey Begins Here
              </span>
            </h1>

            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <p className="text-lg font-semibold text-green-400">
                  Demographic Completed
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center space-x-3 bg-indigo-500/20 px-4 py-2 rounded-full">
                  <Users className="h-5 w-5 text-indigo-400" />
                  <div className="text-left">
                    <Label className="text-xs font-medium text-indigo-300">
                      Role
                    </Label>
                    <p className="text-sm font-semibold text-white">
                      {leadershipData.data.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-purple-500/20 px-4 py-2 rounded-full">
                  <BarChart className="h-5 w-5 text-purple-400" />
                  <div className="text-left">
                    <Label className="text-xs font-medium text-purple-300">
                      Responsibility Level
                    </Label>
                    <p className="text-sm font-semibold text-white">
                      {leadershipData.data.responsibilityLevel}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-6 w-6 text-indigo-400" />
                <Label className="text-lg font-semibold text-white">
                  Description
                </Label>
              </div>
              <p className="text-white/80 leading-relaxed">
                {leadershipData.data.description}
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-4">
                <GitBranch className="h-6 w-6 text-indigo-400" />
                <Label className="text-lg font-semibold text-white">
                  Version Information
                </Label>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-indigo-300 font-semibold mb-1">v1.0</p>
                  <p className="text-white/80 leading-relaxed">
                    {leadershipData.data.versionInfo["v1.0"]}
                  </p>
                </div>
                <div>
                  <p className="text-indigo-300 font-semibold mb-1">v2.0</p>
                  <p className="text-white/80 leading-relaxed">
                    {leadershipData.data.versionInfo["v2.0"]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              type="button"
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-4 text-lg font-semibold rounded-full hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
            >
              Start Assessment
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
