import "./App.css";
import { CategoriesProvider } from "./contexts/CategoriesContext";
import { ProductsProvider } from "./contexts/ProductsContext";
import { AppRoutes } from "./routes/routes";

function App() {
  return (
    <ProductsProvider>
      <CategoriesProvider>
        <AppRoutes />
      </CategoriesProvider>
    </ProductsProvider>
  );
}

export default App;
