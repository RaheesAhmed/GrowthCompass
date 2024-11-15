"use client";

import React from "react";
import {
  ArrowRight,
  Target,
  Users,
  Award,
  CheckCircle,
  Play,
  ChevronRight,
  Star,
  BarChart,
  Shield,
  ArrowUpRight,
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-['Inter']">
      {/* Hero Section with Animated Gradient */}
      <div className="relative overflow-hidden bg-slate-900 pb-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:14px_14px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900" />
        </div>

        <Navigation />

        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              {/* Announcement Banner */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 mb-4">
                <Star className="h-4 w-4 text-indigo-400 mr-2" />
                <span className="text-sm font-medium text-indigo-300">
                  New AI-Powered Platform
                </span>
              </div>

              {/* Hero Title */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block text-white">Transform Your</span>
                <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                  Leadership Journey
                </span>
              </h1>

              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Unlock your leadership potential with personalized AI-driven
                assessments and development plans tailored to your unique role.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                <Link href="/start">
                  <button className="group inline-flex items-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-indigo-500/25">
                    Start Free Assessment
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>
                {/* <button className="group inline-flex items-center px-8 py-4 text-base font-medium text-white bg-slate-800 rounded-xl hover:bg-slate-700 transition-all">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button> */}
              </div>
            </div>
          </div>

          {/* Trusted By Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
            <div className="text-center">
              <p className="text-sm font-medium text-slate-400 mb-8">
                Trusted by leading companies worldwide
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-50">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-8 bg-white/10 rounded-md"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900">
              Everything you need to excel in leadership
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Comprehensive tools and insights to develop your leadership
              capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "AI-Powered Analysis",
                description:
                  "Get personalized insights based on advanced AI algorithms and proven leadership frameworks",
                color: "from-blue-500 to-indigo-500",
              },
              {
                icon: Users,
                title: "Team Development",
                description:
                  "Build and lead high-performing teams with data-driven strategies and best practices",
                color: "from-indigo-500 to-purple-500",
              },
              {
                icon: Award,
                title: "Growth Tracking",
                description:
                  "Monitor your progress with detailed analytics and milestone achievements",
                color: "from-purple-500 to-pink-500",
              },
            ].map((feature, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl transition-all duration-500 group-hover:blur-2xl opacity-0 group-hover:opacity-100" />
                <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/50">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${feature.color} mb-6`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 mb-6">{feature.description}</p>
                  <a
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Learn more
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                number: "150+",
                label: "Enterprise Clients",
                sublabel: "Including Fortune 500",
              },
              {
                number: "50k+",
                label: "Leaders Assessed",
                sublabel: "Across industries",
              },
              {
                number: "98%",
                label: "Success Rate",
                sublabel: "Client satisfaction",
              },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-slate-900">
                  {stat.label}
                </div>
                <div className="text-slate-500 mt-1">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-3xl" />
            <div className="relative bg-white rounded-2xl p-12 shadow-xl border border-indigo-500/10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {[
                  {
                    icon: BarChart,
                    title: "Data-Driven Insights",
                    description:
                      "Make informed decisions with comprehensive analytics",
                  },
                  {
                    icon: Users,
                    title: "Team Alignment",
                    description: "Keep your team focused and motivated",
                  },
                  {
                    icon: Shield,
                    title: "Enterprise Security",
                    description: "Bank-grade security for your data",
                  },
                  {
                    icon: Target,
                    title: "Goal Tracking",
                    description: "Monitor and achieve your objectives",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-6">
                      <benefit.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl" />
            <div className="relative px-12 py-24 text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to transform your leadership?
              </h2>
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Join thousands of leaders who have already enhanced their
                capabilities with GrowthCompass
              </p>
              <button className="inline-flex items-center px-8 py-4 text-base font-medium text-indigo-600 bg-white rounded-xl hover:bg-indigo-50 transition-all shadow-lg group">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
