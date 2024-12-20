import React from "react";
import { ArrowRight, Star, ArrowUpRight } from "lucide-react";

// Add props interface
interface AssessmentChoiceProps {
  onSkip: () => void;
  onStart: () => void;
}

const AssessmentChoice = ({ onSkip, onStart }: AssessmentChoiceProps) => {
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
            {/* Start Assessment Button */}
            <button
              onClick={onStart}
              className="enterprise-button-primary w-full group"
            >
              <div className="relative flex items-center justify-center">
                <span className="text-lg font-medium">Start Assessment</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>

            {/* Skip Assessment Button */}
            <button
              onClick={onSkip}
              className="enterprise-button-secondary w-full group"
            >
              <div className="relative flex items-center justify-center">
                <span className="text-lg font-medium">Skip Assessment</span>
                <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
              </div>
            </button>
          </div>

          {/* Additional Info */}
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
