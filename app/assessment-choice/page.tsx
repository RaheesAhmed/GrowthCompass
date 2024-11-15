"use client";

import AssessmentChoice from "@/components/assessment-choice";
import { useRouter } from "next/navigation";

export default function AssessmentChoicePage() {
  const router = useRouter();

  const handleSkip = async () => {
    const leadershipData = localStorage.getItem("leadershipData");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadershipData: JSON.parse(leadershipData || "{}"),
          responses: [], // Empty responses for skip path
        }),
      });

      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleStartAssessment = () => {
    router.push("/assessment-ready");
  };

  return (
    <AssessmentChoice onSkip={handleSkip} onStart={handleStartAssessment} />
  );
}
