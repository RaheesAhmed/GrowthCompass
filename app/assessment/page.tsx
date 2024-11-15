"use client";

import { useState, useEffect } from "react";
import LevelOneQuestions from "@/components/LevelOneQuestions";
import { useRouter } from "next/navigation";
import type { LeadershipData } from "@/types/leadership";

export default function AssessmentPage() {
  const [leadershipData, setLeadershipData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("leadershipData");
    if (!data) {
      router.push("/start");
      return;
    }
    setLeadershipData(JSON.parse(data));
  }, []);

  const handleAssessmentComplete = async (allResponses) => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadershipData,
          responses: allResponses,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("result", result);
        router.push("/dashboard"); // Create this page to show final results
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
    }
  };

  if (!leadershipData) return null;

  return (
    <LevelOneQuestions
      level={leadershipData.data.responsibilityLevel}
      userInfo={leadershipData.data}
      onComplete={handleAssessmentComplete}
    />
  );
}
