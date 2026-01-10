import './App.css'
import { ProductsProvider } from './contexts/ProductsContext'
import ProductsDashboard from './pages/dashboard/products'

function App() {
  return (
    <ProductsProvider>
      <ProductsDashboard />
    </ProductsProvider>
  )
}

export default App
