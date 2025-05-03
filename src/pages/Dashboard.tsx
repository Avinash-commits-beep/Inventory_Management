
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/dashboard/StatCard';
import CategoryChart from '@/components/dashboard/CategoryChart';
import RecentProducts from '@/components/dashboard/RecentProducts';
import { api } from '@/services/api';
import { DashboardSummary, Product } from '@/types';
import { formatCurrency } from '@/utils/format';
import { BoxIcon, InboxIcon, PackageMinusIcon } from 'lucide-react';

const Dashboard = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryData = await api.getDashboardSummary();
        const products = await api.getProducts();
        const sortedProducts = [...products].sort((a, b) => {
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        });
        
        setSummary(summaryData);
        setRecentProducts(sortedProducts.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <p className="text-lg text-muted-foreground">Loading dashboard data...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your inventory</p>
      </div>

      {summary && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Products" 
            value={summary.totalProducts} 
            icon={<BoxIcon className="w-8 h-8" />}
          />
          <StatCard 
            title="Inventory Value" 
            value={formatCurrency(summary.totalValue)}
            icon={<InboxIcon className="w-8 h-8" />}
          />
          <StatCard 
            title="Low Stock Items" 
            value={summary.lowStockItems}
            description="Products that need reordering"
            icon={<PackageMinusIcon className="w-8 h-8" />}
          />
          <StatCard 
            title="Out of Stock Items" 
            value={summary.outOfStockItems}
            description="Products that are unavailable"
            icon={<PackageMinusIcon className="w-8 h-8" />}
          />
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mt-6">
        {summary && (
          <CategoryChart categories={summary.categories} />
        )}
        <RecentProducts products={recentProducts} />
      </div>
    </Layout>
  );
};

export default Dashboard;
