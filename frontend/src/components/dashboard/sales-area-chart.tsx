// components/dashboard/sales-area-chart.tsx
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { DashboardData } from "@/types/types";

export function SalesAreaChart({ data }: { data: DashboardData[] }) {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="mb-4 text-lg font-semibold">
        Crescimento de vendas
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            dataKey="quantity"
            stackId="1"
            strokeWidth={2}
          />
          <Area
            dataKey="total_price"
            stackId="1"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
