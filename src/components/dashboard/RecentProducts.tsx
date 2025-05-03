
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/types';
import { formatCurrency } from '@/utils/format';

interface RecentProductsProps {
  products: Product[];
}

const RecentProducts: React.FC<RecentProductsProps> = ({ products }) => {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Product</th>
                <th className="text-left py-3 px-4 font-medium">Category</th>
                <th className="text-right py-3 px-4 font-medium">Price</th>
                <th className="text-right py-3 px-4 font-medium">Quantity</th>
                <th className="text-right py-3 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="inventory-table-row border-b">
                  <td className="py-3 px-4">
                    <Link
                      to={`/products/${product.id}`}
                      className="font-medium hover:underline"
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4 text-right">{formatCurrency(product.price)}</td>
                  <td className="py-3 px-4 text-right">{product.quantity}</td>
                  <td className="py-3 px-4 text-right">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No products found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentProducts;
