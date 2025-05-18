
"use client"; 

import { useState, useEffect } from 'react';
import type { Product } from '@/types';
import { ProductCard } from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
// Select components removed as price sorting is removed
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X } from 'lucide-react';

// Mock product data - price removed
const mockProducts: Product[] = [
  { id: '1', name: 'Laptop Pro X', brand: 'TechBrand', model: 'TB-LPX-15', description: 'High-performance laptop for professionals with 16GB RAM and 512GB SSD.', images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'], image_hint: 'laptop computer' },
  { id: '2', name: 'Smartphone Ultra', brand: 'ConnectMe', model: 'CM-SU-67', description: 'Feature-rich smartphone with a stunning display and 128GB storage.', images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'], image_hint: 'smartphone device' },
  { id: '3', name: 'Wireless Headset', brand: 'AudioPure', model: 'AP-WH-V2', description: 'Immersive sound quality with noise cancellation.', images: ['https://placehold.co/600x400.png'], image_hint: 'headphones audio' },
  { id: '4', name: 'Office Printer', brand: 'PrintFast', model: 'PF-M200', description: 'Reliable and efficient multifunction printer.', images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'], image_hint: 'printer office' },
  { id: '5', name: 'Gaming Mouse', brand: 'GameOn', model: 'GO-GM-RGB', description: 'Ergonomic gaming mouse with customizable RGB.', images: ['https://placehold.co/600x400.png'], image_hint: 'gaming mouse' },
  { id: '6', name: '4K Monitor', brand: 'ViewSharp', model: 'VS-4K-27', description: '27-inch 4K UHD monitor for crisp visuals. Great for editing.', images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'], image_hint: 'monitor screen' },
  { id: '7', name: 'Tablet Lite', brand: 'TechBrand', model: 'TB-TL-10', description: 'Lightweight tablet with 8GB RAM, perfect for media consumption.', images: ['https://placehold.co/600x400.png'], image_hint: 'tablet device' },
  { id: '8', name: 'Smartwatch Pro', brand: 'ConnectMe', model: 'CM-SWP-01', description: 'Advanced smartwatch with health tracking and NFC.', images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'], image_hint: 'smartwatch wearable' },
];

export default function UserDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  // Price-related states removed
  // const [sortOrder, setSortOrder] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  // const [minPrice, setMinPrice] = useState<string>('');
  // const [maxPrice, setMaxPrice] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);

  const clearFilters = () => {
    setSearchTerm('');
    // Price-related filter resets removed
    // setSortOrder('default');
    // setMinPrice('');
    // setMaxPrice('');
  };

  const processedProducts = products.filter(product => {
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      const productText = `${product.name} ${product.brand || ''} ${product.model || ''} ${product.description || ''}`.toLowerCase();
      if (!searchTermLower.split(' ').filter(word => word.length > 0).every(word => productText.includes(word))) {
        return false;
      }
    }
    // Price range filter removed
    return true;
  });
  // Price sorting removed

  const activeFilterCount = [searchTerm].filter(Boolean).length;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary">Our Products</h1>
        <p className="text-muted-foreground">Browse our latest collection of tech products and solutions.</p>
      </div>

      <div className="max-w-xl mx-auto flex items-center space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products by name, brand, model, specs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full shadow-sm"
            aria-label="Search products"
          />
        </div>
        {activeFilterCount > 0 && (
          <Button variant="ghost" onClick={clearFilters} className="text-accent hover:text-accent/90 shrink-0">
            <X className="mr-2 h-4 w-4" /> Clear Filters ({activeFilterCount})
          </Button>
        )}
      </div>
      
      {/* Filters and Sorting section removed */}

      <p className="text-center text-muted-foreground">
        Showing {processedProducts.length} of {products.length} products.
      </p>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-3 p-4 border rounded-lg shadow-md bg-card">
              <Skeleton className="h-[200px] w-full rounded-xl bg-muted" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px] bg-muted" />
                <Skeleton className="h-4 w-[150px] bg-muted" />
                {/* Skeleton for price removed */}
                {/* <Skeleton className="h-8 w-[100px] mt-2 bg-muted" /> */}
              </div>
            </div>
          ))}
        </div>
      ) : processedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {processedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">
          {searchTerm ? `No products found matching "${searchTerm}".` : "No products available at the moment. Please check back later."}
        </p>
      )}
    </div>
  );
}
