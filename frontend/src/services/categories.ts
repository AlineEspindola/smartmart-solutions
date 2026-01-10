export const API_URL = import.meta.env.VITE_API_URL as string || "http://localhost:5000";

import { getRequest, postRequest } from "./api";
import type { Category } from "../types/types";

export async function fetchCategories(): Promise<Category[]> {
  return getRequest("/categories") as Promise<Category[]>;
}

export async function createCategory(name: string): Promise<Category> {
  return postRequest("/categories", { name }) as Promise<Category>;
}

export async function uploadCategoriesCSV(
  file: File
): Promise<{ message: string; total_imported: number }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/categories/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Erro no upload CSV");
  return res.json() as Promise<{
    message: string;
    total_imported: number;
  }>;
}