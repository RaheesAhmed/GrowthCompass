"use client";

import { Progress } from "@/components/ui/progress";

const competencies = [
  {
    name: "Leadership",
    progress: 75,
    description: "Team management and decision making",
  },
  {
    name: "Technical Skills",
    progress: 85,
    description: "Domain expertise and technical knowledge",
  },
  {
    name: "Communication",
    progress: 70,
    description: "Written and verbal communication",
  },
  {
    name: "Strategic Thinking",
    progress: 60,
    description: "Problem solving and planning",
  },
  {
    name: "Innovation",
    progress: 65,
    description: "Creative thinking and solution design",
  },
];

export function DevelopmentProgress() {
  return (
    <div className="space-y-8">
      {competencies.map((competency) => (
        <div key={competency.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium leading-none">
                {competency.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {competency.description}
              </p>
            </div>
            <p className="text-sm font-medium">{competency.progress}%</p>
          </div>
          <Progress value={competency.progress} className="h-2" />
        </div>
      ))}
    </div>
  );
}
