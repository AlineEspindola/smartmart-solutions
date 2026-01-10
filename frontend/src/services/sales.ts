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
