// src/contexts/ProductsContext.tsx
import { createContext, useState, useEffect, type ReactNode } from "react";
import type { Product } from "../types/types";
import { fetchProducts, createProduct, uploadProductsCSV } from "../services/products";

interface ProductsContextData {
  products: Product[];
  loading: boolean;
  totalProducts: number;
  totalBrands: number;
  totalPriceSum: number;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  uploadCSV: (file: File) => Promise<void>;
  refreshProducts: () => Promise<void>;
}

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const addProduct = async (product: Omit<Product, "id">) => {
    const newProduct = await createProduct(product);
    setProducts((prev) => [...prev, newProduct]);
  };

  const uploadCSV = async (file: File) => {
    await uploadProductsCSV(file);
    await refreshProducts();
  };

  const totalProducts = products.length;
  const totalBrands = new Set(products.map((p) => p.brand).filter(Boolean)).size;
  const totalPriceSum = products.reduce((sum, p) => sum + p.price, 0);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        totalProducts,
        totalBrands,
        totalPriceSum,
        addProduct,
        uploadCSV,
        refreshProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

const ProductsContext = createContext<ProductsContextData | undefined>(undefined);
export default ProductsContext;
