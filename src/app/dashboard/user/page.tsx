
"use client"; 

import { useState, useEffect } from 'react';
import type { Product } from '@/types';
import { ProductCard } from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X } from 'lucide-react';

// Mock product data - in a real app, this would come from an API
const mockProducts: Product[] = [
  { id: '1', name: 'Laptop Pro X', brand: 'TechBrand', model: 'TB-LPX-15', price: 75000, description: 'High-performance laptop for professionals with 16GB RAM and 512GB SSD.', images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'], image_hint: 'laptop computer' },
  { id: '2', name: 'Smartphone Ultra', brand: 'ConnectMe', model: 'CM-SU-67', price: 45000, description: 'Feature-rich smartphone with a stunning display and 128GB storage.', images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'], image_hint: 'smartphone device' },
  { id: '3', name: 'Wireless Headset', brand: 'AudioPure', model: 'AP-WH-V2', price: 8000, description: 'Immersive sound quality with noise cancellation.', images: ['https://placehold.co/600x400.png'], image_hint: 'headphones audio' },
  { id: '4', name: 'Office Printer', brand: 'PrintFast', model: 'PF-M200', price: 12000, description: 'Reliable and efficient multifunction printer.', images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'], image_hint: 'printer office' },
  { id: '5', name: 'Gaming Mouse', brand: 'GameOn', model: 'GO-GM-RGB', price: 3500, description: 'Ergonomic gaming mouse with customizable RGB.', images: ['https://placehold.co/600x400.png'], image_hint: 'gaming mouse' },
  { id: '6', name: '4K Monitor', brand: 'ViewSharp', model: 'VS-4K-27', price: 28000, description: '27-inch 4K UHD monitor for crisp visuals. Great for editing.', images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'], image_hint: 'monitor screen' },
  { id: '7', name: 'Tablet Lite', brand: 'TechBrand', model: 'TB-TL-10', price: 18000, description: 'Lightweight tablet with 8GB RAM, perfect for media consumption.', images: ['https://placehold.co/600x400.png'], image_hint: 'tablet device' },
  { id: '8', name: 'Smartwatch Pro', brand: 'ConnectMe', model: 'CM-SWP-01', price: 22000, description: 'Advanced smartwatch with health tracking and NFC.', images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'], image_hint: 'smartwatch wearable' },
];

export default function UserDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);

  const clearFilters = () => {
    setSearchTerm('');
    setSortOrder('default');
    setMinPrice('');
    setMaxPrice('');
  };

  const processedProducts = products.filter(product => {
    // Search term filter
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      const productText = `${product.name} ${product.brand || ''} ${product.model || ''} ${product.description || ''}`.toLowerCase();
      if (!searchTermLower.split(' ').filter(word => word.length > 0).every(word => productText.includes(word))) {
        return false;
      }
    }

    // Price range filter
    const numMinPrice = parseFloat(minPrice);
    const numMaxPrice = parseFloat(maxPrice);

    if (!isNaN(numMinPrice) && numMinPrice >= 0 && product.price < numMinPrice) {
      return false;
    }
    if (!isNaN(numMaxPrice) && numMaxPrice >= 0 && product.price > numMaxPrice) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    if (sortOrder === 'price-asc') {
      return a.price - b.price;
    }
    if (sortOrder === 'price-desc') {
      return b.price - a.price;
    }
    return 0; // Default order
  });

  const activeFilterCount = [searchTerm, sortOrder !== 'default', minPrice, maxPrice].filter(Boolean).length;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary">Our Products</h1>
        <p className="text-muted-foreground">Browse our latest collection of tech products and solutions.</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-xl mx-auto">
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

      {/* Filters and Sorting */}
      <div className="max-w-4xl mx-auto p-4 border rounded-lg shadow-sm bg-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <Label htmlFor="sortOrder" className="text-sm font-medium">Sort by</Label>
            <Select value={sortOrder} onValueChange={(value: 'default' | 'price-asc' | 'price-desc') => setSortOrder(value)}>
              <SelectTrigger id="sortOrder" className="w-full mt-1">
                <SelectValue placeholder="Select order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="minPrice" className="text-sm font-medium">Min Price (₹)</Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="e.g., 5000"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full mt-1"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="maxPrice" className="text-sm font-medium">Max Price (₹)</Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="e.g., 50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full mt-1"
                min="0"
              />
            </div>
          </div>
          
          <div className="md:text-right">
            {activeFilterCount > 0 && (
              <Button variant="ghost" onClick={clearFilters} className="text-accent hover:text-accent/90">
                <X className="mr-2 h-4 w-4" /> Clear Filters ({activeFilterCount})
              </Button>
            )}
          </div>
        </div>
      </div>

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
                <Skeleton className="h-8 w-[100px] mt-2 bg-muted" />
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
          {searchTerm || minPrice || maxPrice || sortOrder !== 'default' ? `No products found matching your criteria. Try adjusting your filters.` : "No products available at the moment. Please check back later."}
        </p>
      )}
    </div>
  );
}

    