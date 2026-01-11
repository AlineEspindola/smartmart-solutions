export const API_URL = import.meta.env.VITE_API_URL as string || "http://localhost:5000";

import { getRequest, postRequest } from "./api";
import type { Sale, DashboardData } from "../types/types";

export async function fetchSales(): Promise<Sale[]> {
  return getRequest("/sales") as Promise<Sale[]>;
}

export async function createSale(sale: Sale): Promise<Sale> {
  return postRequest("/sales", sale) as Promise<Sale>;
}

export async function fetchDashboardData(): Promise<DashboardData[]> {
  return getRequest("/sales/dashboard") as Promise<DashboardData[]>;
}

export async function uploadSalesCSV(
  file: File
): Promise<{ message: string; total_imported: number }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/sales/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Erro no upload do CSV de vendas");
  }

  return res.json();
}
