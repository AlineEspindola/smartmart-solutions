// src/pages/dashboard/sales-dashboard.tsx
import { StatsCard } from "@/components/dashboard/stats-card";
import { Loading } from "./loading";
import { useSales } from "@/hooks/useSales";

import { SalesBarChart } from "@/components/dashboard/sales-bar-chart";
import { SalesLineChart } from "@/components/dashboard/sales-line-chart";
import { SalesAreaChart } from "@/components/dashboard/sales-area-chart";
import { Button } from "@/components/ui/button";

export default function SalesDashboard() {
  const { dashboard, loading, totalSales, totalRevenue, uploadCSV } =
    useSales();

  if (loading) return <Loading />;

  const handleCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) await uploadCSV(e.target.files[0]);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Vendas</h1>

      <div className="flex justify-end">
        <label>
          <Button variant="outline" asChild>
            <span>Importar CSV</span>
          </Button>
          <input
            type="file"
            accept=".csv"
            onChange={handleCSV}
            className="hidden"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total de Itens Vendidos" value={totalSales} />
        <StatsCard
          title="Faturamento Total"
          value={`R$ ${totalRevenue.toFixed(2)}`}
        />
        <StatsCard title="Meses com Vendas" value={dashboard.length} />
        <StatsCard
          title="Ticket Médio"
          value={
            totalSales > 0
              ? `R$ ${(totalRevenue / totalSales).toFixed(2)}`
              : "R$ 0,00"
          }
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SalesBarChart data={dashboard} />
        <SalesLineChart data={dashboard} />
      </div>

      <div className="rounded-lg border bg-background p-4">
        <SalesAreaChart data={dashboard} />
      </div>
    </div>
  );
}
