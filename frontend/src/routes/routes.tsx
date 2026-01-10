import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductsDashboard from "@/pages/dashboard/products"
import CategoriesDashboard from "@/pages/dashboard/categories"
import { AppLayout } from "@/components/layout/app-layout"

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<ProductsDashboard />} />
          <Route path="/categories" element={<CategoriesDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
