import { useContext } from "react";
import ProductsContext from "../contexts/ProductsContext";

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts deve ser usado dentro do ProductsProvider");
  }
  return context;
};
