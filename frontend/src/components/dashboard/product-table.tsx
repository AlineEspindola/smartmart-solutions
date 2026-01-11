import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Product } from "@/types/types";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PackageOpen } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({ products }: ProductTableProps) {
  const { addProduct, uploadCSV } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    brand: "",
    description: "",
    category_id: 1,
  });

  const [filters, setFilters] = useState({
    search: "",
    category_id: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
  });

  const categoryMap = useMemo(() => {
    const map: Record<number, string> = {};
    categories.forEach((c) => {
      if (c.id) map[c.id] = c.name;
    });
    return map;
  }, [categories]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        filters.search &&
        !product.name.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;

      if (
        filters.category_id &&
        product.category_id !== Number(filters.category_id)
      )
        return false;

      if (
        filters.brand &&
        !product.brand?.toLowerCase().includes(filters.brand.toLowerCase())
      )
        return false;

      if (filters.minPrice && product.price < Number(filters.minPrice))
        return false;

      if (filters.maxPrice && product.price > Number(filters.maxPrice))
        return false;

      return true;
    });
  }, [products, filters]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProduct(formData);
    setIsModalOpen(false);
    setFormData({
      name: "",
      price: 0,
      brand: "",
      description: "",
      category_id: 1,
    });
  };

  const handleCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) await uploadCSV(e.target.files[0]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2 p-2">
        <Button onClick={() => setIsModalOpen(true)}>Adicionar Produto</Button>

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

      <div className="grid gap-3 md:grid-cols-5 px-4">
        <Input
          placeholder="Buscar produto"
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
        />

        <Select
          value={filters.category_id}
          onValueChange={(value) =>
            setFilters({ ...filters, category_id: value })
          }
          disabled={categoriesLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id!.toString()}
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Marca"
          value={filters.brand}
          onChange={(e) =>
            setFilters({ ...filters, brand: e.target.value })
          }
        />

        <Input
          type="number"
          placeholder="Preço mín."
          value={filters.minPrice}
          onChange={(e) =>
            setFilters({ ...filters, minPrice: e.target.value })
          }
        />

        <Input
          type="number"
          placeholder="Preço máx."
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: e.target.value })
          }
        />
      </div>

      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() =>
            setFilters({
              search: "",
              category_id: "",
              brand: "",
              minPrice: "",
              maxPrice: "",
            })
          }
        >
          Limpar filtros
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Adicionar Produto</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-3 mt-4">
            <Input
              placeholder="Nome"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            <Input
              type="text"
              placeholder="Preço"
              value={formData.price}
              onChange={(e) => {
                const value = e.target.value.replace(",", ".");
                if (/^\d*\.?\d*$/.test(value)) {
                  setFormData({
                    ...formData,
                    price: Number(value),
                  });
                }
              }}
              required
            />

            <Input
              placeholder="Marca"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
              required
            />

            <Input
              placeholder="Descrição"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />

            <Select
              value={formData.category_id.toString()}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  category_id: Number(value),
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id!.toString()}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex justify-end pt-2">
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* TABELA */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-10 text-center">
          <PackageOpen className="h-10 w-10 text-muted-foreground" />
          <h3 className="text-lg font-semibold">
            Nenhum produto encontrado
          </h3>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Marca</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  {product.name}
                </TableCell>
                <TableCell>
                  {categoryMap[product.category_id] ??
                    "Categoria não encontrada"}
                </TableCell>
                <TableCell>
                  R$ {product.price.toFixed(2)}
                </TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
