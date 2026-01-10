import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Product } from "@/types/types"
interface ProductTableProps {
  products: Product[]; 
}

export function ProductTable({ products }: ProductTableProps) {
  return (
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
  )
}
