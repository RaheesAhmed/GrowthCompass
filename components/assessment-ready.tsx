import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Star,
  ArrowUpRight,
  CheckCircle2,
  User,
  Briefcase,
  Building2,
} from "lucide-react";

interface AssessmentData {
  level: number;
  role: string;
  responsibilityLevel: string;
  userInfo: {
    name: string;
    organization: string;
  };
}

interface AssessmentReadyProps {
  data: AssessmentData;
  onStartAssessment: () => void;
  onKnowMore: () => void;
}

const AssessmentReady = ({
  data,
  onStartAssessment,
  onKnowMore,
}: AssessmentReadyProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center mt-20">
      <div className="relative max-w-2xl mx-auto px-4 py-12">
        {/* Success Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 border border-primary-100">
            <CheckCircle2 className="h-4 w-4 text-primary-600 mr-2" />
            <span className="text-sm font-medium text-primary-600">
              Profile Complete
            </span>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="enterprise-card">
          {/* User Info Section */}
          <div className="p-8 border-b border-surface-200">
            <h2 className="text-4xl font-semibold tracking-tight text-center mb-6">
              <span className="block text-primary-950">Ready for Your</span>
              <span className="block enterprise-text">
                Leadership Assessment
              </span>
            </h2>

            {/* User Details */}
            <div className="bg-surface-50 rounded-xl p-6 border border-surface-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 text-surface-600">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-surface-500">Name</p>
                    <p className="font-medium text-primary-950">
                      {data.userInfo.name || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-surface-600">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-surface-500">Role</p>
                    <p className="font-medium text-primary-950">{data.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-surface-600">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-surface-500">Organization</p>
                    <p className="font-medium text-primary-950">
                      {data.userInfo.organization || "Not provided"}
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
              className="enterprise-button-primary w-full group"
            >
              <div className="relative flex items-center justify-center">
                <span className="text-lg font-medium">Start Assessment</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>

            {/* Know More Button */}
            <button
              onClick={onKnowMore}
              className="enterprise-button-secondary w-full group"
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
          <div className="p-6 bg-surface-50 rounded-b-xl border-t border-surface-200">
            <div className="flex items-start gap-3">
              <Star className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-surface-600">
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
