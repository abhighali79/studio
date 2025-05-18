
"use client"; 

import React, { useState, useEffect } from 'react';
import { ProductCard } from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

export default function UserDashboardPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const storedAdminProducts = localStorage.getItem('adminProducts');
      if (storedAdminProducts) {
        try {
          const parsedProducts = JSON.parse(storedAdminProducts);
          if (Array.isArray(parsedProducts)) {
            setProducts(parsedProducts);
          } else {
            setProducts([]); 
          }
        } catch (error) {
          console.error("Failed to parse admin products from localStorage", error);
          setProducts([]); 
        }
      } else {
        setProducts([]); 
      }
      setLoading(false);
    }, 500); 
    return () => clearTimeout(timer);
  }, []);

  const clearFilters = () => {
    setSearchTerm('');
  };

  const processedProducts = products.filter(product => {
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      const productText = `${product.name} ${product.brand || ''} ${product.model || ''} ${product.description || ''}`.toLowerCase();
      if (!searchTermLower.split(' ').filter(word => word.length > 0).every(word => productText.includes(word))) {
        return false;
      }
    }
    return true;
  });

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
      
      <p className="text-center text-muted-foreground">
        Showing {processedProducts.length} of {products.length} products.
      </p>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: products.length > 0 ? products.length : 4 }).map((_, index) => ( 
            <div key={index} className="flex flex-col space-y-3 p-4 border rounded-lg shadow-md bg-card">
              <Skeleton className="h-[200px] w-full rounded-xl bg-muted" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px] bg-muted" />
                <Skeleton className="h-4 w-[150px] bg-muted" />
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
