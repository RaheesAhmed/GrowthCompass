import React from "react";
import { ArrowRight, Star, ArrowUpRight } from "lucide-react";

// Add props interface
interface AssessmentChoiceProps {
  onSkip: () => void;
  onStart: () => void;
}

const AssessmentChoice = ({ onSkip, onStart }: AssessmentChoiceProps) => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      {/* Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:14px_14px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-12 text-center">
        {/* Header Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20">
            <Star className="h-4 w-4 text-indigo-400 mr-2" />
            <span className="text-sm font-medium text-indigo-300">
              Leadership Assessment
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-700">
          <h2 className="text-4xl font-bold tracking-tight text-center mb-4">
            <span className="block text-white">Ready to Begin Your</span>
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              Leadership Journey?
            </span>
          </h2>

          <p className="text-slate-300 mb-8 text-lg">
            Choose your path to leadership excellence. Take the assessment now
            or explore more details.
          </p>

          <div className="space-y-4">
            {/* Start Assessment Button */}
            <button
              onClick={onStart}
              className="w-full group relative px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl hover:opacity-90 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center">
                <span className="text-lg font-medium">Start Assessment</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>

            {/* Skip Assessment Button */}
            <button
              onClick={onSkip}
              className="w-full group relative px-8 py-4 bg-slate-900/50 text-slate-300 rounded-xl border border-slate-700/50 hover:bg-slate-900 hover:border-indigo-500/20 hover:text-white transition-all duration-300"
            >
              <div className="relative flex items-center justify-center">
                <span className="text-lg font-medium">Skip Assessment</span>
                <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
              </div>
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <p className="text-sm text-slate-400">
              The assessment takes approximately 15-20 minutes to complete
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentChoice;
