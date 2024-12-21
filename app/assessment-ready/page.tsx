"use client";

import AssessmentReady from "@/components/assessment-ready";
import { useRouter } from "next/navigation";
import KnowMore from "@/components/know-more";
import { useState, useEffect } from "react";

export default function AssessmentReadyPage() {
  const router = useRouter();
  const [showKnowMore, setShowKnowMore] = useState(false);
  const [assessmentData, setAssessmentData] = useState(null);

  useEffect(() => {
    // Get both data sources
    const leadershipData = localStorage.getItem("leadershipData");
    const currentAssessmentData = localStorage.getItem("currentAssessmentData");

    if (leadershipData) {
      const parsedLeadershipData = JSON.parse(leadershipData);
      const parsedCurrentData = currentAssessmentData
        ? JSON.parse(currentAssessmentData)
        : null;

      // Merge data, preferring leadership data for common fields
      setAssessmentData({
        level: parsedLeadershipData.data.level,
        role: parsedLeadershipData.data.role,
        responsibilityLevel: parsedLeadershipData.data.context.decisionLevel,
        userInfo: {
          name:
            parsedLeadershipData.data.name || parsedCurrentData?.userInfo?.name,
          organization:
            parsedLeadershipData.data.organization ||
            parsedCurrentData?.userInfo?.organization,
        },
      });
    }
  }, []);

  const handleStartAssessment = () => {
    router.push("/assessment");
  };

  const handleKnowMore = () => {
    setShowKnowMore(true);
  };

  if (showKnowMore) {
    return <KnowMore onStartAssessment={handleStartAssessment} />;
  }

  if (!assessmentData) {
    return null; // or a loading state
  }

  return (
    <AssessmentReady
      data={assessmentData}
      onStartAssessment={handleStartAssessment}
      onKnowMore={handleKnowMore}
    />
  );
}
