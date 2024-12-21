import React, { useEffect, useState } from "react";
import { ArrowRight, Star, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface AssessmentData {
  level: number;
  role: string;
  responsibilityLevel: string;
  userInfo: {
    name: string;
    organization: string;
  };
}

const AssessmentChoice = () => {
  const router = useRouter();
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(
    null
  );

  useEffect(() => {
    const storedData = localStorage.getItem("currentAssessmentData");
    if (storedData) {
      setAssessmentData(JSON.parse(storedData));
    }
  }, []);

  const handleStart = () => {
    if (assessmentData) {
      // Store the current assessment state
      localStorage.setItem("assessmentState", "started");
      router.push("/assessment-ready");
    }
  };

  const handleSkip = () => {
    if (assessmentData) {
      localStorage.setItem("assessmentState", "skipped");
      router.push("/dashboard");
    }
  };

  if (!assessmentData) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="relative max-w-2xl mx-auto px-4 py-12 text-center">
        {/* Header Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 border border-primary-100">
            <Star className="h-4 w-4 text-primary-600 mr-2" />
            <span className="text-sm font-medium text-primary-600">
              Leadership Assessment
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="enterprise-card p-8">
          <h2 className="text-4xl font-semibold tracking-tight text-center mb-4">
            <span className="block text-primary-950">Ready to Begin Your</span>
            <span className="block enterprise-text">Leadership Journey?</span>
          </h2>

          <p className="text-surface-600 mb-8 text-lg">
            Choose your path to leadership excellence. Take the assessment now
            or explore more details.
          </p>

          <div className="space-y-4">
            <button
              onClick={handleStart}
              className="enterprise-button-primary w-full group"
            >
              <div className="relative flex items-center justify-center">
                <span className="text-lg font-medium">Start Assessment</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>

            <button
              onClick={handleSkip}
              className="enterprise-button-secondary w-full group"
            >
              <div className="flex items-center justify-center">
                <span className="text-lg font-medium">Skip Assessment</span>
                <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
              </div>
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-surface-200">
            <p className="text-sm text-surface-500">
              The assessment takes approximately 15-20 minutes to complete
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentChoice;
