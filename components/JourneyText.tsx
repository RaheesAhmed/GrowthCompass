"use client";

import React from "react";
import { ArrowUpRight, Star, Sparkles } from "lucide-react";

const JourneyText = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Grid Background */}
      <div className="relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:14px_14px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Header Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/20">
              <Star className="h-4 w-4 text-indigo-400 mr-2" />
              <span className="text-sm font-medium text-indigo-300">
                Begin Your Journey
              </span>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-700">
            <h2 className="text-4xl font-bold tracking-tight text-center mb-8">
              <span className="block text-white">Your Leadership</span>
              <span className="block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Journey Begins Here
              </span>
            </h2>

            <div className="space-y-6 text-slate-300">
              <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-indigo-400 first-letter:mr-3 first-letter:float-left">
                You stand at the{" "}
                <span className="text-indigo-400 font-semibold">
                  threshold of a transformative journey
                </span>
                —one of self-discovery and empowerment that will elevate your
                career to new heights. This process is far more than a simple
                assessment; it's a{" "}
                <span className="italic">strategic pathway</span> to unlocking
                your full potential in management and leadership.
              </p>

              <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-700/50">
                <p className="text-indigo-400 font-medium mb-4">
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
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                        <ArrowUpRight className="h-5 w-5 text-indigo-400 transition-transform group-hover:scale-110" />
                      </div>
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 rounded-xl" />
                <p className="relative text-center text-lg font-medium text-white py-6 px-8 rounded-xl border border-indigo-500/20">
                  Prepare to challenge yourself, expand your perspectives, and
                  emerge as a more{" "}
                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text font-bold">
                    confident, capable leader
                  </span>{" "}
                  ready to tackle the complexities of today's business world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyText;
