
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductCard from '@/components/products/ProductCard';
import { api } from '@/services/api';
import { Product } from '@/types';
import { SearchIcon } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, categoryFilter, products]);

  const filterProducts = () => {
    let filtered = [...products];

    // Apply search query filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((product) => product.category === categoryFilter);
    }

    setFilteredProducts(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Get unique categories
  const categories = ['all', ...new Set(products.map((product) => product.category))];

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your inventory products</p>
        </div>
        <Link to="/add-product">
          <Button>Add New Product</Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="w-full md:w-1/2 relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
        <div className="w-full md:w-1/4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-muted-foreground">Loading products...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-muted/20 rounded-lg p-12 text-center">
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery || categoryFilter !== 'all'
              ? "Try changing your search or filter criteria"
              : "Start by adding products to your inventory"}
          </p>
          {searchQuery || categoryFilter !== 'all' ? (
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
              }}
            >
              Clear filters
            </Button>
          ) : (
            <Link to="/add-product">
              <Button>Add Product</Button>
            </Link>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Products;
