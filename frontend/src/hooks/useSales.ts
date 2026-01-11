import { useEffect, useState } from "react";
import {
  fetchSales,
  fetchDashboardData,
  uploadSalesCSV, 
} from "@/services/sales";
import type { Sale, DashboardData } from "@/types/types";

export function useSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [dashboard, setDashboard] = useState<DashboardData[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshSales = async () => {
    setLoading(true);
    try {
      const [salesRes, dashboardRes] = await Promise.all([
        fetchSales(),
        fetchDashboardData(),
      ]);

      setSales(salesRes);
      setDashboard(dashboardRes);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSales();
  }, []);

  const uploadCSV = async (file: File) => {
    await uploadSalesCSV(file);
    await refreshSales();
  };

  const totalSales = sales.reduce((sum, s) => sum + s.quantity, 0);
  const totalRevenue = sales.reduce((sum, s) => sum + s.total_price, 0);

  return {
    sales,
    dashboard,
    loading,
    totalSales,
    totalRevenue,
    uploadCSV,      
    refreshSales,
  };
}
