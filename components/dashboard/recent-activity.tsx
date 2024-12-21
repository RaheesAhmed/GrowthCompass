"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const activities = [
  {
    id: 1,
    type: "Completed Assessment",
    description: "Leadership Skills Assessment",
    date: "2 hours ago",
    icon: "👨‍💼",
  },
  {
    id: 2,
    type: "Goal Achieved",
    description: "Team Management Milestone",
    date: "Yesterday",
    icon: "🎯",
  },
  {
    id: 3,
    type: "Learning Complete",
    description: "Strategic Planning Course",
    date: "2 days ago",
    icon: "📚",
  },
  {
    id: 4,
    type: "Feedback Received",
    description: "Peer Review Session",
    date: "3 days ago",
    icon: "💬",
  },
  {
    id: 5,
    type: "New Goal Set",
    description: "Project Management Skills",
    date: "1 week ago",
    icon: "✨",
  },
];

export function RecentActivity() {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-8">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className="mt-1">
              <Avatar className="h-9 w-9">
                <AvatarImage alt={activity.type} />
                <AvatarFallback className="bg-primary/10">
                  {activity.icon}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {activity.type}
              </p>
              <p className="text-sm text-muted-foreground">
                {activity.description}
              </p>
              <p className="text-xs text-muted-foreground">{activity.date}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
