"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardNavProps {
  items: {
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
}

export function DashboardNav({ items }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href}>
            <span
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent" : "transparent"
              )}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
