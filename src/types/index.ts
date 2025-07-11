export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Sales Staff';
  status: 'Active' | 'Inactive';
  lastLogin: Date;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: 'Suits' | 'Shirts' | 'Trousers' | 'Shoes' | 'Accessories';
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  color: string;
  quantity: number;
  buyingPrice: number;
  sellingPrice: number;
  supplier: string;
  notes?: string;
  lastStockDate: Date;
  image?: string;
}

export interface StockEntry {
  id: string;
  productName: string;
  quantity: number;
  buyingPrice: number;
  addedBy: string;
  date: Date;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  profit: number;
  salesperson: string;
  date: Date;
}

export interface DashboardStats {
  todaySales: number;
  itemsSoldToday: number;
  currentStockValue: number;
  todayProfit: number;
}