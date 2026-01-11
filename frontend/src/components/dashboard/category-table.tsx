// src/components/dashboard/category-table.tsx
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Layers } from "lucide-react";
import type { Category } from "@/types/types";
import { useCategories } from "@/hooks/useCategories";

interface CategoryTableProps {
  categories: Category[];
}

export function CategoryTable({ categories }: CategoryTableProps) {
  const { addCategory, uploadCSV } = useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addCategory(formData);
    setIsModalOpen(false);
    setFormData({ name: "" });
  };

  const handleCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      await uploadCSV(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2 p-2">
        <Button onClick={() => setIsModalOpen(true)}>
          Adicionar Categoria
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Adicionar Categoria</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-3 mt-4">
            <Input
              placeholder="Nome da categoria"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            <div className="flex justify-end pt-2">
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-10 text-center">
          <Layers className="h-10 w-10 text-muted-foreground" />

          <div className="space-y-1">
            <h3 className="text-lg font-semibold">
              Nenhuma categoria cadastrada
            </h3>
            <p className="text-sm text-muted-foreground">
              Crie categorias para organizar seus produtos.
            </p>
          </div>

          <Button onClick={() => setIsModalOpen(true)}>
            Adicionar Categoria
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
