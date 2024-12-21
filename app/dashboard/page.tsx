"use client";

import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "@/components/dashboard/overview";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { DevelopmentProgress } from "@/components/dashboard/development-progress";
import { ArrowUpRight, Target, Clock, Trophy, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const userDisplayName =
    session?.user?.name || session?.user?.email?.split("@")[0] || "User";

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back, {userDisplayName}
          </h1>
          <p className="text-sm text-muted-foreground">
            Track your professional development journey
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary-600">
          <Sparkles className="h-4 w-4" />
          <span>Level 3 - Senior Professional</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Level</CardTitle>
            <Target className="h-4 w-4 text-primary-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">Level 3</div>
              <div className="flex items-center text-xs text-emerald-600">
                <ArrowUpRight className="h-3 w-3" />
                <span>+1 this quarter</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Senior Professional
            </p>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary-500/20 to-primary-500"></div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Progress to Next Level
            </CardTitle>
            <Clock className="h-4 w-4 text-primary-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">67%</div>
              <div className="flex items-center text-xs text-emerald-600">
                <ArrowUpRight className="h-3 w-3" />
                <span>+2.5%</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Estimated 2 months to Level 4
            </p>
            <div className="absolute inset-x-0 bottom-0 h-1">
              <div className="h-full w-[67%] bg-primary-500"></div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Goals
            </CardTitle>
            <Trophy className="h-4 w-4 text-primary-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">12/15</div>
              <div className="flex items-center text-xs text-emerald-600">
                <ArrowUpRight className="h-3 w-3" />
                <span>80%</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              3 goals remaining this quarter
            </p>
            <div className="absolute inset-x-0 bottom-0 h-1">
              <div className="h-full w-[80%] bg-primary-500"></div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Learning Hours
            </CardTitle>
            <Clock className="h-4 w-4 text-primary-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">28h</div>
              <div className="flex items-center text-xs text-emerald-600">
                <ArrowUpRight className="h-3 w-3" />
                <span>+4h</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">This month</p>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary-500 to-primary-400"></div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4">
          <CardHeader>
            <CardTitle>Growth Overview</CardTitle>
            <CardDescription>
              Your development progress over time
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest development activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4">
          <CardHeader>
            <CardTitle>Development Progress</CardTitle>
            <CardDescription>
              Track your progress across key competencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DevelopmentProgress />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
