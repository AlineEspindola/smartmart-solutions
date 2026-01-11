import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { DashboardData } from "@/types/types";

export function SalesLineChart({ data }: { data: DashboardData[] }) {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="mb-4 text-lg font-semibold">
        Faturamento mensal
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total_price"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
