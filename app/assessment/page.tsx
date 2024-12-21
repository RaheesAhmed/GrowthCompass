"use client";

import { useState, useEffect } from "react";
import LevelOneQuestions from "@/components/LevelOneQuestions";
import { useRouter } from "next/navigation";
import type { LeadershipData } from "@/types/leadership";
import type { AssessmentResponse } from "@/types/level-one";
import Plan from "@/components/plan";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AssessmentPage() {
  const [leadershipData, setLeadershipData] = useState<LeadershipData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [planData, setPlanData] = useState<string>("");
  const [storedResponses, setStoredResponses] = useState<AssessmentResponse[]>(
    []
  );
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("leadershipData");
    if (!data) {
      router.push("/start");
      return;
    }
    setLeadershipData(JSON.parse(data));
  }, [router]);

  const generatePlan = async (responses: AssessmentResponse[]) => {
    try {
      setIsLoading(true);
      setIsSubmitting(true);
      const userData = localStorage.getItem("userData");
      const parsedUserData = userData ? JSON.parse(userData) : null;

      toast({
        title: "Generating Plan",
        description:
          "Please wait while we create your personalized development plan...",
      });

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

      toast({
        title: "Plan Generated",
        description: "Your leadership development plan is ready!",
      });
    } catch (error) {
      console.error("Error streaming assessment:", error);
      toast({
        title: "Error",
        description: "Failed to generate your plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleAssessmentComplete = (responses: AssessmentResponse[]) => {
    setStoredResponses(responses);
    generatePlan(responses);
  };

  const handleRegenerate = () => {
    setPlanData("");
    generatePlan(storedResponses);
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
          <LevelOneQuestions
            level={leadershipData.data.responsibilityLevel}
            userInfo={leadershipData.data}
            responsibilityLevel={leadershipData.data.responsibilityLevel}
            onComplete={handleAssessmentComplete}
            isSubmitting={isSubmitting}
          />
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
