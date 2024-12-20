"use client";

import { useState, useEffect } from "react";
import LevelOneQuestions from "@/components/LevelOneQuestions";
import { useRouter } from "next/navigation";
import type { LeadershipData } from "@/types/leadership";
import type { AssessmentResponse } from "@/types/assessment";
import Plan from "@/components/plan";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";

export default function AssessmentPage() {
  const [leadershipData, setLeadershipData] = useState<LeadershipData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [planData, setPlanData] = useState<string>("");
  const [showGenerateButton, setShowGenerateButton] = useState(false);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("leadershipData");
    if (!data) {
      router.push("/start");
      return;
    }
    setLeadershipData(JSON.parse(data));
  }, [router]);

  const handleAssessmentComplete = async (
    allResponses: AssessmentResponse[]
  ) => {
    setResponses(allResponses);
    setShowGenerateButton(true);
  };

  const generatePlan = async () => {
    try {
      setIsLoading(true);
      const userData = localStorage.getItem("userData");
      const parsedUserData = userData ? JSON.parse(userData) : null;

      const response = await fetch("/api/streaming", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadershipData,
          responses,
          userData: parsedUserData,
        }),
      });

      if (!response.ok) {
        throw new Error("Stream response was not ok");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let result = "";

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        result += chunk;
        setPlanData(result);
      }
    } catch (error) {
      console.error("Error streaming assessment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    setPlanData("");
    generatePlan();
  };

  if (!leadershipData) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Enterprise Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:14px_14px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface-50/20 to-background" />
      </div>

      <div className="relative">
        {!planData ? (
          <>
            <LevelOneQuestions
              level={leadershipData.data.responsibilityLevel}
              userInfo={leadershipData.data}
              responsibilityLevel={leadershipData.data.responsibilityLevel}
              onComplete={handleAssessmentComplete}
            />
            <AnimatePresence>
              {showGenerateButton && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
                >
                  <div className="relative">
                    {/* Main Button */}
                    <Button
                      onClick={generatePlan}
                      disabled={isLoading}
                      className="enterprise-button-primary relative group px-8 py-6 text-lg"
                    >
                      <span className="relative flex items-center gap-3">
                        {isLoading ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Generating Your Leadership Plan...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-5 w-5" />
                            <span>Generate Your Leadership Plan</span>
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                    </Button>

                    {/* Decorative Elements */}
                    <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-primary-200 via-primary-300 to-primary-200 opacity-50 blur group-hover:opacity-75 transition-opacity" />

                    {/* Animated Ring */}
                    <motion.div
                      className="absolute -inset-4 rounded-xl bg-primary-100/20 -z-10"
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.3, 0.2, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <Plan
            content={planData}
            isLoading={isLoading}
            onRegenerate={handleRegenerate}
          />
        )}
      </div>
    </div>
  );
}
