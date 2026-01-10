import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PackageOpen } from "lucide-react";

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({ products }: ProductTableProps) {
  const { addProduct, uploadCSV } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    brand: "",
    description: "",
    category_id: 1,
  });

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
      {/* AÇÕES */}
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

      {/* MODAL */}
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
              type="number"
              placeholder="Preço"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: Number(e.target.value),
                })
              }
              required
            />

            <Input
              placeholder="Marca"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
            />

            <Input
              placeholder="Descrição"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />

            <Input
              type="number"
              placeholder="Categoria ID"
              value={formData.category_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category_id: Number(e.target.value),
                })
              }
            />

            <div className="flex justify-end pt-2">
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* EMPTY STATE */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-10 text-center">
          <PackageOpen className="h-10 w-10 text-muted-foreground" />

          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Nenhum produto cadastrado</h3>
            <p className="text-sm text-muted-foreground">
              Adicione um produto ou importe um arquivo CSV para começar.
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => setIsModalOpen(true)}>
              Adicionar Produto
            </Button>

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
        </div>
      ) : (
        /* TABELA */
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
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category_id}</TableCell>
                <TableCell>R$ {product.price.toFixed(2)}</TableCell>
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
