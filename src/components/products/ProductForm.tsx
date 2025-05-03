
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Product } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

// Define form schema with Zod
const formSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  price: z.coerce.number().positive({ message: 'Price must be positive' }),
  quantity: z.coerce.number().int().nonnegative({ message: 'Quantity must be zero or positive' }),
  description: z.string().optional(),
  imageUrl: z.string().url({ message: 'Invalid URL format' }).optional().or(z.literal('')),
});

type FormData = z.infer<typeof formSchema>;

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: FormData) => Promise<void>;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const isEditing = !!product;

  // Initialize form with either existing product data or defaults
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || '',
      category: product?.category || '',
      price: product?.price || 0,
      quantity: product?.quantity || 0,
      description: product?.description || '',
      imageUrl: product?.imageUrl || '',
    },
  });

  const handleSubmit = async (data: FormData) => {
    try {
      await onSubmit(data);
      toast({
        title: `Product ${isEditing ? 'updated' : 'created'} successfully!`,
        description: `${data.name} has been ${isEditing ? 'updated' : 'added'} to your inventory.`,
      });
      navigate('/products');
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${isEditing ? 'update' : 'create'} product. Please try again.`,
        variant: 'destructive',
      });
    }
  };

  // Categories available in the application
  const categories = ['Electronics', 'Audio', 'Furniture', 'Appliances', 'Wearables', 'Lighting', 'Other'];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter product description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/products')}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
