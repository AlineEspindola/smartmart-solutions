export interface Product {
  id?: number; // opcional se ainda não criado
  name: string;
  description: string;
  price: number;
  brand?: string;
  category_id: number;
}

export interface Category {
  id?: number;
  name: string;
}

export interface Sale {
  id?: number;
  product_id: number;
  quantity: number;
  total_price: number;
  date: string; 
}

export interface DashboardData {
  month: number;
  quantity: number;
  total_price: number;
}
