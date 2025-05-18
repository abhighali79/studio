"use client";

import { useState, useEffect } from 'react';
import type { Product } from '@/types';
import { AddProductForm } from './add-product-form';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { ListCollapse, LayoutGrid } from 'lucide-react';

// Initial mock products for admin view, can be expanded by the form
const initialMockProducts: Product[] = [
  { id: 'admin-1', name: 'Admin Laptop Sample', brand: 'AdminBrand', model: 'AB-LPX-15', price: 85000, description: 'This is a sample product visible on the admin panel.', images: ['https://placehold.co/600x400.png?text=AdminLaptop1', 'https://placehold.co/600x400.png?text=AdminLaptop2'], image_hint: 'laptop device' },
  { id: 'admin-2', name: 'Admin Phone Sample', brand: 'AdminConnect', model: 'AC-SU-67', price: 55000, description: 'Another sample product for admin management.', images: ['https://placehold.co/600x400.png?text=AdminPhone1'], image_hint: 'phone mobile' },
];

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); // Default to grid

  useEffect(() => {
    // Load products from local storage or use initial mocks
    const storedProducts = localStorage.getItem('adminProducts');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(initialMockProducts);
    }
  }, []);

  const handleAddProduct = (newProduct: Product) => {
    const updatedProducts = [newProduct, ...products];
    setProducts(updatedProducts);
    localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
  };

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your products efficiently.</p>
      </div>
      
      <AddProductForm onAddProduct={handleAddProduct} />

      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-primary">Current Products ({products.length})</h2>
          <div className="flex space-x-2">
            <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('grid')} aria-label="Grid view">
              <LayoutGrid className="h-5 w-5" />
            </Button>
            <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('list')} aria-label="List view">
              <ListCollapse className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {products.length > 0 ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                showAdminActions={true}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">No products added yet. Use the form above to add new products.</p>
        )}
      </div>
    </div>
  );
}
