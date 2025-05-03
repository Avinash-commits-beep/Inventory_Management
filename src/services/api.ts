
import { Product, DashboardSummary } from '../types';

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop',
    category: 'Electronics',
    price: 999.99,
    quantity: 15,
    status: 'in-stock',
    lastUpdated: '2025-04-15T10:30:00Z',
    description: 'High-performance laptop with 16GB RAM and 512GB SSD',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80',
  },
  {
    id: '2',
    name: 'Smartphone',
    category: 'Electronics',
    price: 699.99,
    quantity: 8,
    status: 'in-stock',
    lastUpdated: '2025-04-16T14:20:00Z',
    description: 'Latest model with 128GB storage and triple camera',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
  },
  {
    id: '3',
    name: 'Wireless Headphones',
    category: 'Audio',
    price: 149.99,
    quantity: 3,
    status: 'low-stock',
    lastUpdated: '2025-04-10T09:15:00Z',
    description: 'Noise-cancelling wireless headphones with 30-hour battery life',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
  {
    id: '4',
    name: 'Ergonomic Chair',
    category: 'Furniture',
    price: 249.99,
    quantity: 0,
    status: 'out-of-stock',
    lastUpdated: '2025-04-05T16:45:00Z',
    description: 'Comfortable office chair with lumbar support',
    imageUrl: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
  {
    id: '5',
    name: 'Coffee Maker',
    category: 'Appliances',
    price: 89.99,
    quantity: 12,
    status: 'in-stock',
    lastUpdated: '2025-04-12T11:00:00Z',
    description: 'Programmable coffee maker with 12-cup capacity',
    imageUrl: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80',
  },
  {
    id: '6',
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: 29.99,
    quantity: 6,
    status: 'low-stock',
    lastUpdated: '2025-04-14T13:55:00Z',
    description: 'Ergonomic wireless mouse with long battery life',
    imageUrl: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
  {
    id: '7',
    name: 'Smart Watch',
    category: 'Wearables',
    price: 199.99,
    quantity: 9,
    status: 'in-stock',
    lastUpdated: '2025-04-18T10:10:00Z',
    description: 'Fitness tracking with heart rate monitor and GPS',
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80',
  },
  {
    id: '8',
    name: 'Desk Lamp',
    category: 'Lighting',
    price: 49.99,
    quantity: 0,
    status: 'out-of-stock',
    lastUpdated: '2025-04-08T15:30:00Z',
    description: 'LED desk lamp with adjustable brightness',
    imageUrl: 'https://images.unsplash.com/photo-1572635148818-ef6fd45eb394?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API service
export const api = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    await delay(500);
    return [...mockProducts];
  },
  
  // Get a single product by ID
  getProduct: async (id: string): Promise<Product | undefined> => {
    await delay(300);
    return mockProducts.find(product => product.id === id);
  },
  
  // Create a new product
  createProduct: async (product: Omit<Product, 'id' | 'lastUpdated'>): Promise<Product> => {
    await delay(600);
    
    const newProduct: Product = {
      ...product,
      id: `${mockProducts.length + 1}`,
      lastUpdated: new Date().toISOString(),
    };
    
    mockProducts.push(newProduct);
    return newProduct;
  },
  
  // Update an existing product
  updateProduct: async (id: string, updates: Partial<Product>): Promise<Product | undefined> => {
    await delay(400);
    
    const index = mockProducts.findIndex(product => product.id === id);
    if (index === -1) return undefined;
    
    mockProducts[index] = {
      ...mockProducts[index],
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    
    return mockProducts[index];
  },
  
  // Delete a product
  deleteProduct: async (id: string): Promise<boolean> => {
    await delay(300);
    
    const index = mockProducts.findIndex(product => product.id === id);
    if (index === -1) return false;
    
    mockProducts.splice(index, 1);
    return true;
  },
  
  // Get dashboard summary
  getDashboardSummary: async (): Promise<DashboardSummary> => {
    await delay(700);
    
    // Calculate summary stats
    const categories = [...new Set(mockProducts.map(product => product.category))];
    const categorySummaries: CategorySummary[] = categories.map(catName => {
      const categoryProducts = mockProducts.filter(product => product.category === catName);
      return {
        name: catName,
        count: categoryProducts.length,
        value: categoryProducts.reduce((total, product) => total + (product.price * product.quantity), 0),
      };
    });
    
    return {
      totalProducts: mockProducts.length,
      totalValue: mockProducts.reduce((total, product) => total + (product.price * product.quantity), 0),
      lowStockItems: mockProducts.filter(product => product.status === 'low-stock').length,
      outOfStockItems: mockProducts.filter(product => product.status === 'out-of-stock').length,
      categories: categorySummaries,
    };
  },
  
  // Search products
  searchProducts: async (query: string): Promise<Product[]> => {
    await delay(300);
    
    const lowerQuery = query.toLowerCase();
    return mockProducts.filter(product => 
      product.name.toLowerCase().includes(lowerQuery) || 
      product.category.toLowerCase().includes(lowerQuery) ||
      product.description?.toLowerCase().includes(lowerQuery)
    );
  }
};
