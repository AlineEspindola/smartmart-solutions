import { useCategories } from "@/hooks/useCategories";
import { Loading } from "./loading";
import { CategoryTable } from "@/components/dashboard/category-table";

export default function ProductsDashboard() {
  const { categories, loading } =
    useCategories();

  if (loading) return <Loading/>;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Produtos</h1>
      <div className="rounded-lg border bg-background">
        <CategoryTable categories={categories} />
      </div>
    </div>
  );
}
