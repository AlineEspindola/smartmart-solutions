import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { DashboardData } from "@/types/types";

interface Props {
  data: DashboardData[];
}

export function SalesBarChart({ data }: Props) {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="mb-4 text-lg font-semibold">
        Vendas por mês
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
