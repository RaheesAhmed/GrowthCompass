"use client";

import { useState, useEffect } from "react";
import LevelOneQuestions from "@/components/LevelOneQuestions";
import { useRouter } from "next/navigation";
import type { LeadershipData } from "@/types/leadership";
import type { AssessmentResponse } from "@/types/assessment";
import Plan from "@/components/plan";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Button } from "@/components/ui/button";

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
          {showGenerateButton && (
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
              <Button
                onClick={generatePlan}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-4 text-lg font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={24} className="mr-2" />
                    Generating Plan...
                  </>
                ) : (
                  "Generate Your Leadership Plan"
                )}
              </Button>
            </div>
          )}
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
