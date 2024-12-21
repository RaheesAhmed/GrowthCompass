"use client";

import dynamic from "next/dynamic";

const OverviewChart = dynamic(
  () => import("./overview-chart").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[350px] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    ),
  }
);

export function Overview() {
  return (
    <div className="w-full h-[350px]">
      <OverviewChart />
    </div>
  );
}
