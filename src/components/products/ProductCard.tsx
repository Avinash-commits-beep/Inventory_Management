
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Product } from '@/types';
import { formatCurrency } from '@/utils/format';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="hover-scale overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={product.imageUrl || 'https://via.placeholder.com/300x200'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="pt-4">
        <div className="mb-2 flex justify-between items-start">
          <h3 className="font-medium text-lg truncate">{product.name}</h3>
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
        <p className="text-muted-foreground text-sm">{product.category}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="font-bold">{formatCurrency(product.price)}</p>
          <p className="text-sm">{product.quantity} in stock</p>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link
          to={`/products/${product.id}`}
          className="w-full bg-primary text-primary-foreground rounded-md py-2 text-center text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
