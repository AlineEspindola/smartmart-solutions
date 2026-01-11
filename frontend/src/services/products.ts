export const API_URL = import.meta.env.VITE_API_URL as string || "http://localhost:5000";

import { getRequest, postRequest } from "./api";
import type { Product } from "../types/types";

export async function fetchProducts(): Promise<Product[]> {
  return getRequest("/products") as Promise<Product[]>;
}

export async function createProduct(product: Product): Promise<Product> {
  return postRequest("/products", product) as Promise<Product>;
}

export async function uploadProductsCSV(file: File): Promise<{ message: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/products/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Erro no upload CSV");
  return res.json() as Promise<{ message: string }>;
}
