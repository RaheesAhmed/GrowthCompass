"use client";

import { ReactNode, useState, useEffect } from "react";
import { DashboardNav } from "@/components/dashboard-nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Settings,
  User,
  GraduationCap,
  Target,
  Calendar,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const sidebarNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: BarChart3,
    description: "Your growth at a glance",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
    description: "Manage your information",
  },
  {
    title: "Development Plan",
    href: "/dashboard/development",
    icon: Target,
    description: "Set and track your goals",
  },
  {
    title: "Learning Path",
    href: "/dashboard/learning",
    icon: GraduationCap,
    description: "Your educational journey",
  },
  {
    title: "Progress Tracking",
    href: "/dashboard/progress",
    icon: Calendar,
    description: "Monitor your achievements",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    description: "Customize your experience",
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const userDisplayName =
    session?.user?.name || session?.user?.email?.split("@")[0] || "User";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Mobile Navigation Header */}
      <div className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary-500" />
          <span className="text-lg font-semibold">GrowthCompass</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="md:hidden"
        >
          {isMobileNavOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
        {/* Sidebar - Desktop */}
        <aside className="fixed top-0 z-30 -ml-2 hidden h-screen w-full shrink-0 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:sticky md:block">
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <Sparkles className="h-5 w-5 text-primary-500" />
            <span className="text-lg font-semibold">GrowthCompass</span>
          </div>
          <ScrollArea className="h-[calc(100vh-4rem)] px-4 py-6 lg:py-8">
            <div className="mb-4 px-2">
              <div className="flex items-center gap-3 rounded-lg bg-primary-50/50 px-3 py-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100">
                  <User className="h-5 w-5 text-primary-700" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate">
                    {userDisplayName}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {session.user?.email}
                  </span>
                </div>
              </div>
            </div>
            <DashboardNav items={sidebarNavItems} />
          </ScrollArea>
        </aside>

        {/* Sidebar - Mobile */}
        {isMobileNavOpen && (
          <aside className="fixed inset-0 top-16 z-40 h-[calc(100vh-4rem)] w-full animate-in slide-in-from-left-80 border-r bg-background md:hidden">
            <ScrollArea className="h-full px-4 py-6">
              <div className="mb-4 px-2">
                <div className="flex items-center gap-3 rounded-lg bg-primary-50/50 px-3 py-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100">
                    <User className="h-5 w-5 text-primary-700" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium truncate">
                      {userDisplayName}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {session.user?.email}
                    </span>
                  </div>
                </div>
              </div>
              <DashboardNav items={sidebarNavItems} />
            </ScrollArea>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1">{children}</div>
        </main>
      </div>
    </div>
  );
}
