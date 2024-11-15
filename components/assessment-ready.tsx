import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Star,
  ArrowUpRight,
  CheckCircle2,
  User,
  Briefcase,
  Building2,
} from "lucide-react";

interface AssessmentReadyProps {
  onStartAssessment: () => void;
  onKnowMore: () => void;
}

interface UserData {
  data: {
    role: string;
    responsibilityLevel: number;
    description: string;
    name?: string;
    organization?: string;
  };
}

const AssessmentReady = ({
  onStartAssessment,
  onKnowMore,
}: AssessmentReadyProps) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("leadershipData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      {/* Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:14px_14px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-12">
        {/* Success Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 mr-2" />
            <span className="text-sm font-medium text-emerald-300">
              Profile Complete
            </span>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700">
          {/* User Info Section */}
          <div className="p-8 border-b border-slate-700/50">
            <h2 className="text-4xl font-bold tracking-tight text-center mb-6">
              <span className="block text-white">Ready for Your</span>
              <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Leadership Assessment
              </span>
            </h2>

            {/* User Details */}
            <div className="bg-slate-900/30 rounded-xl p-6 border border-slate-700/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                    <User className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Name</p>
                    <p className="font-medium">
                      {userData.data.name || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Role</p>
                    <p className="font-medium">{userData.data.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Organization</p>
                    <p className="font-medium">
                      {userData.data.organization || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="p-8 space-y-4">
            {/* Start Assessment Button */}
            <button
              onClick={onStartAssessment}
              className="w-full group relative px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl hover:opacity-90 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center">
                <span className="text-lg font-medium">Start Assessment</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>

            {/* Know More Button */}
            <button
              onClick={onKnowMore}
              className="w-full group px-8 py-4 bg-slate-900/50 text-slate-300 rounded-xl border border-slate-700/50 hover:bg-slate-900 hover:border-indigo-500/20 hover:text-white transition-all duration-300"
            >
              <div className="flex items-center justify-center">
                <span className="text-lg font-medium">
                  Know More About Assessment
                </span>
                <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
              </div>
            </button>
          </div>

          {/* Info Footer */}
          <div className="p-6 bg-slate-900/30 rounded-b-2xl border-t border-slate-700/50">
            <div className="flex items-start gap-3">
              <Star className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-400">
                Your assessment has been tailored based on your role level. The
                assessment will take approximately 15-20 minutes to complete.
                You can pause and resume at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentReady;
