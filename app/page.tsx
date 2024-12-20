"use client";

import React from "react";
import {
  ArrowRight,
  Target,
  Users,
  BarChart,
  Shield,
  ArrowUpRight,
  CheckCircle,
  Building,
} from "lucide-react";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Hero Section */}
      <section className="relative py-20 mt-15">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 border border-primary-100 mb-6">
                <span className="text-sm font-medium text-primary-600">
                  AI-Powered Growth Platform
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-semibold text-primary-950 mb-6">
                Accelerate Your{" "}
                <span className="enterprise-text">Professional Growth</span>
              </h1>

              <p className="text-lg text-surface-600 mb-8">
                Transform your career trajectory with personalized AI insights,
                data-driven strategies, and actionable development plans.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Link href="/start">
                  <button className="enterprise-button-primary">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4 inline-block" />
                  </button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-surface-600">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary-600" />
                  <span className="text-sm">Enterprise Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                  <span className="text-sm">ISO 27001 Certified</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surface-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">
              Accelerate Your{" "}
              <span className="enterprise-text">Leadership Journey</span>
            </h2>
            <p className="text-lg text-surface-600">
              Comprehensive tools and frameworks designed for modern leaders
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "AI-Powered Assessment",
                description:
                  "Get personalized insights and recommendations based on your unique leadership style",
              },
              {
                icon: BarChart,
                title: "Progress Analytics",
                description:
                  "Track your growth with detailed metrics and performance insights",
              },
              {
                icon: Users,
                title: "Team Development",
                description:
                  "Build and nurture high-performing teams with actionable strategies",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="enterprise-card p-6"
              >
                <div className="h-12 w-12 rounded-lg bg-primary-50 flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-medium text-primary-950 mb-3">
                  {feature.title}
                </h3>
                <p className="text-surface-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                number: "150+",
                label: "Enterprise Partners",
                sublabel: "Including Fortune 500",
                icon: Building,
              },
              {
                number: "50k+",
                label: "Professionals Guided",
                sublabel: "Across industries",
                icon: Users,
              },
              {
                number: "98%",
                label: "Success Rate",
                sublabel: "Career advancement",
                icon: CheckCircle,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary-50 mb-4">
                  <stat.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="text-3xl font-semibold text-primary-950 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-primary-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-surface-600">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-surface-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Common Questions</h2>
            <p className="text-lg text-surface-600">
              Everything you need to know about GrowthCompass
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How does the assessment process work?",
                answer:
                  "Our AI-powered assessment evaluates your professional competencies across key areas. The process takes about 20-30 minutes and includes adaptive questions based on your responses.",
              },
              {
                question: "What's included in the development plan?",
                answer:
                  "Your personalized development plan includes targeted skill recommendations, actionable steps for growth, curated learning resources, and progress tracking tools.",
              },
              {
                question: "How do you track progress?",
                answer:
                  "We use a combination of AI analytics, self-assessments, and milestone tracking to measure your growth. You'll have access to detailed dashboards showing your progress.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mb-4"
              >
                <div className="enterprise-card p-6 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-primary-950 mb-2">
                      {faq.question}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 text-primary-600" />
                  </div>
                  <p className="text-surface-600">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="enterprise-card enterprise-gradient p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-white text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                    Ready to accelerate your growth?
                  </h2>
                  <p className="text-primary-100">
                    Join thousands of professionals advancing their careers
                  </p>
                </div>
                <div className="flex gap-4">
                  <button className="enterprise-button-secondary">
                    Start Free Trial
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
