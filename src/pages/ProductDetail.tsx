
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { api } from '@/services/api';
import { Product } from '@/types';
import { formatCurrency, formatDate } from '@/utils/format';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { EditIcon, PackageIcon, TrashIcon } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
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

  const handleDelete = async () => {
    if (!product) return;

    try {
      await api.deleteProduct(product.id);
      toast({
        title: 'Product deleted',
        description: `${product.name} has been removed from your inventory.`,
      });
      navigate('/products');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete product. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
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
          <Button className="mt-4" onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
          <p className="text-muted-foreground mt-1">Product details</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/products')}>
            Back to Products
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/edit-product/${product.id}`)}
          >
            <EditIcon className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <TrashIcon className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete <strong>{product.name}</strong>? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <Card>
            <CardContent className="p-0">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/500x500'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-1 md:col-span-2">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Product Name</h3>
                <p className="text-lg font-medium mt-1">{product.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                <p className="text-lg mt-1">{product.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Price</h3>
                <p className="text-lg font-bold mt-1">{formatCurrency(product.price)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Quantity</h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-lg font-medium">{product.quantity}</p>
                  <span
                    className={`inventory-status ${
                      product.status === 'in-stock'
                        ? 'status-in-stock'
                        : product.status === 'low-stock'
                        ? 'status-low-stock'
                        : 'status-out-of-stock'
                    }`}
                  >
                    {product.status === 'in-stock'
                      ? 'In Stock'
                      : product.status === 'low-stock'
                      ? 'Low Stock'
                      : 'Out of Stock'}
                  </span>
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p className="mt-1">{product.description || 'No description available'}</p>
              </div>
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
                <p className="mt-1">{formatDate(product.lastUpdated)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProductDetail;
