
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductForm from '@/components/products/ProductForm';
import { api } from '@/services/api';
import { calculateStatus } from '@/utils/format';

const AddProduct = () => {
  const handleSubmit = async (data: any) => {
    // Calculate status based on quantity
    const status = calculateStatus(data.quantity);
    
    // Create new product
    await api.createProduct({
      ...data,
      status,
    });
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
        <p className="text-muted-foreground mt-1">Add a new product to your inventory</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </Layout>
  );
};

export default AddProduct;
