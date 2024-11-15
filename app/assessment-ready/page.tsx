"use client";

import AssessmentReady from "@/components/assessment-ready";
import { useRouter } from "next/navigation";
import KnowMore from "@/components/know-more";
import { useState } from "react";

export default function AssessmentReadyPage() {
  const router = useRouter();
  const [showKnowMore, setShowKnowMore] = useState(false);

  const handleStartAssessment = () => {
    router.push("/assessment");
  };

  const handleKnowMore = () => {
    setShowKnowMore(true);
  };

  if (showKnowMore) {
    return <KnowMore onStartAssessment={handleStartAssessment} />;
  }

  return (
    <AssessmentReady
      onStartAssessment={handleStartAssessment}
      onKnowMore={handleKnowMore}
    />
  );
}
