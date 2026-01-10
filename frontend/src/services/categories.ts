import { getRequest, postRequest } from "./api";
import type { Category } from "../types/types";

export async function fetchCategories(): Promise<Category[]> {
  return getRequest("/categories") as Promise<Category[]>;
}

export async function createCategory(name: string): Promise<Category> {
  return postRequest("/categories", { name }) as Promise<Category>;
}
