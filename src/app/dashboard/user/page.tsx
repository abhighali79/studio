
"use client"; // This page will fetch data or use client-side state for products

import { useState, useEffect } from 'react';
import type { Product } from '@/types';
import { ProductCard } from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Mock product data - in a real app, this would come from an API
const mockProducts: Product[] = [
  { id: '1', name: 'Laptop Pro X', brand: 'TechBrand', model: 'TB-LPX-15', price: 75000, description: 'High-performance laptop for professionals with 16GB RAM and 512GB SSD.', images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'], image_hint: 'laptop computer' },
  { id: '2', name: 'Smartphone Ultra', brand: 'ConnectMe', model: 'CM-SU-67', price: 45000, description: 'Feature-rich smartphone with a stunning display and 128GB storage.', images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'], image_hint: 'smartphone device' },
  { id: '3', name: 'Wireless Headset', brand: 'AudioPure', model: 'AP-WH-V2', price: 8000, description: 'Immersive sound quality with noise cancellation.', images: ['https://placehold.co/600x400.png'], image_hint: 'headphones audio' },
  { id: '4', name: 'Office Printer', brand: 'PrintFast', model: 'PF-M200', price: 12000, description: 'Reliable and efficient multifunction printer.', images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'], image_hint: 'printer office' },
  { id: '5', name: 'Gaming Mouse', brand: 'GameOn', model: 'GO-GM-RGB', price: 3500, description: 'Ergonomic gaming mouse with customizable RGB.', images: ['https://placehold.co/600x400.png'], image_hint: 'gaming mouse' },
  { id: '6', name: '4K Monitor', brand: 'ViewSharp', model: 'VS-4K-27', price: 28000, description: '27-inch 4K UHD monitor for crisp visuals. Great for editing.', images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'], image_hint: 'monitor screen' },
];

export default function UserDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000); // Simulate 1 second loading time
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter(product => {
    if (!searchTerm) return true;
    const searchTermLower = searchTerm.toLowerCase();
    const productText = `${product.name} ${product.model || ''} ${product.description || ''}`.toLowerCase();
    // Check if all words in searchTermLower are present in productText
    return searchTermLower.split(' ').filter(word => word.length > 0).every(word => productText.includes(word));
  });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary">Our Products</h1>
        <p className="text-muted-foreground">Browse our latest collection of tech products and solutions.</p>
      </div>

      <div className="relative mb-6 max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products by name, model, specs (e.g., Laptop Pro X, 16GB RAM)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full shadow-sm"
          aria-label="Search products"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-3 p-4 border rounded-lg shadow-md">
              <Skeleton className="h-[200px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-8 w-[100px] mt-2" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">
          {searchTerm ? `No products found matching "${searchTerm}". Try a different search.` : "No products available at the moment. Please check back later."}
        </p>
      )}
    </div>
  );
}
