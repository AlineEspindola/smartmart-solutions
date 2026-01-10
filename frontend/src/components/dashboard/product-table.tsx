import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const products = [
  {
    id: 1,
    name: "Notebook Dell",
    category: "Eletrônicos",
    price: "R$ 5.200",
    description: "Notebook Dell Inspiron 15 3000",
    brand: "Dell Brasil",
  },
  {
    id: 2,
    name: "Mouse Logitech",
    category: "Acessórios",
    price: "R$ 180",
    description: "Mouse sem fio Logitech M185",
    brand: "Logitech",
  },
]

export function ProductTable() {
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
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>{product.brand}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
