
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductForm from '@/components/products/ProductForm';
import { api } from '@/services/api';
import { Product } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { calculateStatus } from '@/utils/format';

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const data = await api.getProduct(id);
        if (data) {
          setProduct(data);
        } else {
          toast({
            title: 'Product not found',
            description: 'The requested product could not be found.',
            variant: 'destructive',
          });
          navigate('/products');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: 'Error',
          description: 'Failed to load product details.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate, toast]);

  const handleSubmit = async (data: any) => {
    if (!id) return;
    
    try {
      // Calculate new status based on quantity
      const status = calculateStatus(data.quantity);
      
      // Update product
      await api.updateProduct(id, {
        ...data,
        status,
      });
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <p className="text-lg text-muted-foreground">Loading product details...</p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-lg text-muted-foreground">Product not found</p>
          <button
            className="mt-4 px-4 py-2 bg-primary text-white rounded"
            onClick={() => navigate('/products')}
          >
            Back to Products
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
        <p className="text-muted-foreground mt-1">Update product information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm product={product} onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </Layout>
  );
};

export default EditProduct;
