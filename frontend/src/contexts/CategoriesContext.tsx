// src/contexts/CategoriesContext.tsx
import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Category } from "@/types/types";
import {
  fetchCategories,
  createCategory,
  uploadCategoriesCSV,
} from "@/services/categories";

interface CategoriesContextData {
  categories: Category[];
  loading: boolean;
  totalCategories: number;
  addCategory: (data: Omit<Category, "id">) => Promise<void>;
  refreshCategories: () => Promise<void>;
  uploadCSV: (file: File) => Promise<void>;
}

const CategoriesContext = createContext<CategoriesContextData | undefined>(
  undefined
);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchCategories();
      setCategories(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCategories();
  }, []);

  const addCategory = async (data: Omit<Category, "id">) => {
    await createCategory(data.name);
    await refreshCategories();
  };

  const uploadCSV = async (file: File) => {
    await uploadCategoriesCSV(file);
    await refreshCategories();
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        loading,
        totalCategories: categories.length,
        addCategory,
        uploadCSV,
        refreshCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export default CategoriesContext;
