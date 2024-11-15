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
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleStartAssessment = () => {
    localStorage.setItem("leadershipData", JSON.stringify(leadershipData));
    router.push("/assessment-choice");
  };

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

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-2xl p-6 border border-indigo-500/20 transform hover:scale-105 transition-transform duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <Users className="h-8 w-8 text-indigo-400 mb-2" />
                <Label className="text-sm font-medium text-indigo-300">
                  Role
                </Label>
                <p className="text-2xl font-bold text-white mt-1 tracking-tight">
                  {leadershipData.data.role}
                </p>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full -ml-12 -mb-12 blur-2xl"></div>
              </div>

              <div className="relative overflow-hidden bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl p-6 border border-purple-500/20 transform hover:scale-105 transition-transform duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <BarChart className="h-8 w-8 text-purple-400 mb-2" />
                <Label className="text-sm font-medium text-purple-300">
                  Level
                </Label>
                <p className="text-7xl font-bold text-white mt-1 tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                  {leadershipData.data.responsibilityLevel}
                </p>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/10 rounded-full -ml-12 -mb-12 blur-2xl"></div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full mt-6 w-fit mx-auto">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <p className="text-lg font-semibold text-green-400">
                Demographic Completed
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors duration-300">
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

            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <GitBranch className="h-6 w-6 text-indigo-400" />
                <Label className="text-lg font-semibold text-white">
                  Version Information
                </Label>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-4 border border-indigo-500/20">
                  <p className="text-indigo-300 font-semibold mb-2 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-indigo-400 mr-2"></span>
                    v1.0
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    {leadershipData.data.versionInfo["v1.0"]}
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-purple-500/20">
                  <p className="text-purple-300 font-semibold mb-2 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                    v2.0
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    {leadershipData.data.versionInfo["v2.0"]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              onClick={handleStartAssessment}
              className="group relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-10 py-5 text-lg font-semibold rounded-2xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <span className="relative flex items-center">
                Start Assessment
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
