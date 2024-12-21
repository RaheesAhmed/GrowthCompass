"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    value: 45,
  },
  {
    name: "Feb",
    value: 52,
  },
  {
    name: "Mar",
    value: 58,
  },
  {
    name: "Apr",
    value: 63,
  },
  {
    name: "May",
    value: 67,
  },
  {
    name: "Jun",
    value: 72,
  },
];

export default function OverviewChart() {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => `${value}%`}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
