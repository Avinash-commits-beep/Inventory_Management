
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastUpdated: string;
  description?: string;
  imageUrl?: string;
}

export interface DashboardSummary {
  totalProducts: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
  categories: CategorySummary[];
}

export interface CategorySummary {
  name: string;
  count: number;
  value: number;
}
