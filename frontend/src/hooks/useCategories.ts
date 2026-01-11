import { useContext } from "react";
import CategoriesContext from "../contexts/CategoriesContext";

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories deve ser usado dentro do CategoriesProvider");
  }
  return context;
}
