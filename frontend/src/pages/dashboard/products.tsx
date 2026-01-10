import { StatsCard } from "@/components/dashboard/stats-card";
import { ProductTable } from "@/components/dashboard/product-table";
import { useProducts } from "@/hooks/useProducts";
import { ProductsLoading } from "./products-loading";

export default function ProductsDashboard() {
  const { products, loading, totalProducts, totalBrands, totalPriceSum } =
    useProducts();

  if (loading) return <ProductsLoading/>;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Produtos</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total de Produtos" value={totalProducts} />
        <StatsCard title="Marcas" value={totalBrands} />
        <StatsCard title="Categorias" value="12" />
        <StatsCard title="Valor Total em Estoque" value={`R$ ${totalPriceSum.toFixed(2)}`} />
      </div>

      <div className="rounded-lg border bg-background">
        <ProductTable products={products} />
      </div>
    </div>
  );
}
