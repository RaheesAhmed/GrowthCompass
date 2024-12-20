"use client";

import React from "react";
import { ArrowUpRight, Star, Sparkles } from "lucide-react";

const JourneyText = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 border border-primary-100">
            <Star className="h-4 w-4 text-primary-600 mr-2" />
            <span className="text-sm font-medium text-primary-600">
              Begin Your Journey
            </span>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="enterprise-card p-8">
          <h2 className="text-4xl font-semibold tracking-tight text-center mb-8">
            <span className="block text-primary-950">Your Leadership</span>
            <span className="block enterprise-text">Journey Begins Here</span>
          </h2>

          <div className="space-y-6 text-surface-600">
            <p className="first-letter:text-5xl first-letter:font-semibold first-letter:text-primary-600 first-letter:mr-3 first-letter:float-left">
              You stand at the{" "}
              <span className="text-primary-600 font-semibold">
                threshold of a transformative journey
              </span>
              —one of self-discovery and empowerment that will elevate your
              career to new heights. This process is far more than a simple
              assessment; it's a{" "}
              <span className="italic">strategic pathway</span> to unlocking
              your full potential in management and leadership.
            </p>

            <div className="bg-surface-50 rounded-xl p-6 border border-surface-100">
              <p className="text-primary-600 font-medium mb-4">
                As you embark on this adventure, you'll gain profound insights
                into:
              </p>
              <ul className="space-y-4">
                {[
                  "Your strengths and capabilities",
                  "Areas primed for growth and development",
                  "Unique value you bring to your organization",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center">
                      <ArrowUpRight className="h-5 w-5 text-primary-600 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="text-surface-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <p className="text-center text-lg font-medium text-primary-950 py-6 px-8 rounded-xl bg-primary-50 border border-primary-100">
                Prepare to challenge yourself, expand your perspectives, and
                emerge as a more{" "}
                <span className="enterprise-text font-semibold">
                  confident, capable leader
                </span>{" "}
                ready to tackle the complexities of today's business world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyText;
