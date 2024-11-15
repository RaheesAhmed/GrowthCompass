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
import { Sparkles } from "lucide-react";

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
    <>
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
                className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={generatePlan}
                    className="relative group bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-12 py-6 text-xl font-semibold rounded-full hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500"
                    disabled={isLoading}
                  >
                    {/* Animated background effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Sparkle effects */}
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5 text-white opacity-75" />
                      <Sparkles className="absolute top-1/2 right-4 transform -translate-y-1/2 w-5 h-5 text-white opacity-75" />
                    </motion.div>

                    {/* Button content */}
                    <span className="relative flex items-center justify-center">
                      {isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="mr-3"
                          >
                            <CircularProgress />
                          </motion.div>
                          <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                            Generating Plan...
                          </span>
                        </>
                      ) : (
                        <motion.span
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
                        >
                          Generate Your Leadership Plan
                        </motion.span>
                      )}
                    </span>
                  </Button>
                </motion.div>

                {/* Decorative rings */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full -z-10"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.3, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
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
    </>
  );
}
