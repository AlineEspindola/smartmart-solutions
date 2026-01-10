import { StatsCard } from "@/components/dashboard/stats-card"
import { ProductTable } from "@/components/dashboard/product-table"

export default function ProductsDashboard() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Produtos</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total de Produtos" value="31" />
        <StatsCard title="Total de Unidades em Estoque" value="128" />
        <StatsCard title="Categorias" value="12" />
        <StatsCard title="Valor Total em Estoque" value="R$ 12.800" />
      </div>

      <div className="rounded-lg border bg-background">
        <ProductTable />
      </div>
    </div>
  )
}
