import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Product } from "@/types/types"
import { useProducts } from "@/hooks/useProducts"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface ProductTableProps {
  products: Product[]
}

export function ProductTable({ products }: ProductTableProps) {
  const { addProduct, uploadCSV } = useProducts()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    brand: "",
    description: "",
    category_id: 1,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await addProduct(formData)
    setIsModalOpen(false)
    setFormData({ name: "", price: 0, brand: "", description: "", category_id: 1 })
  }

  const handleCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) await uploadCSV(e.target.files[0])
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2 p-2">
        <Button onClick={() => setIsModalOpen(true)}>Adicionar Produto</Button>
        <input
          type="file"
          accept=".csv"
          onChange={handleCSV}
          className="border p-1 rounded cursor-pointer"
        />
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Adicionar Produto</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-2 mt-4">
            <Input
              placeholder="Nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Preço"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            />
            <Input
              placeholder="Marca"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            />
            <Input
              placeholder="Descrição"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Categoria ID"
              value={formData.category_id}
              onChange={(e) =>
                setFormData({ ...formData, category_id: Number(e.target.value) })
              }
            />

            <div className="flex justify-end mt-2">
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

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
              <TableCell>R$ {product.price}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.brand}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
