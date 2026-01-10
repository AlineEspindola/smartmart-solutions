import "./App.css"
import { ProductsProvider } from "./contexts/ProductsContext"
import { AppRoutes } from "./routes/routes"

function App() {
  return (
    <ProductsProvider>
      <AppRoutes />
    </ProductsProvider>
  )
}

export default App
