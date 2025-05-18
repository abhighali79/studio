
"use client";

import React, { useState, useEffect } from 'react';
import { AddProductForm } from './add-product-form';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ListCollapse, LayoutGrid, Search } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/protected-route';

// Initial mock products for admin view, can be expanded by the form
const initialMockProducts = [
  { id: 'admin-1', name: 'Admin Laptop Sample', brand: 'AdminBrand', model: 'AB-LPX-15', description: 'This is a sample product visible on the admin panel, 8GB RAM.', images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'], image_hint: 'laptop device' },
  { id: 'admin-2', name: 'Admin Phone Sample', brand: 'AdminConnect', model: 'AC-SU-67', description: 'Another sample product for admin management, 256GB storage.', images: ['https://placehold.co/600x400.png'], image_hint: 'phone mobile' },
];

export default function AdminDashboardPage() {
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedProducts = localStorage.getItem('adminProducts');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(initialMockProducts);
    }
  }, []);

  const handleAddProduct = (newProduct) => {
    const updatedProducts = [newProduct, ...products];
    setProducts(updatedProducts);
    localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
  };

  const filteredAdminProducts = products.filter(product => {
    if (!searchTerm) return true;
    const searchTermLower = searchTerm.toLowerCase();
    const productText = `${product.name} ${product.model || ''} ${product.description || ''}`.toLowerCase();
    return searchTermLower.split(' ').filter(word => word.length > 0).every(word => productText.includes(word));
  });

  return (
    <ProtectedRoute>
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your products efficiently.</p>
        </div>
        
        <AddProductForm onAddProduct={handleAddProduct} />

        <div className="mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-primary">Current Products ({filteredAdminProducts.length})</h2>
            <div className="flex w-full sm:w-auto items-center space-x-2">
              <div className="relative flex-grow sm:flex-grow-0">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64 shadow-sm"
                  aria-label="Search admin products"
                />
              </div>
              <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('grid')} aria-label="Grid view">
                <LayoutGrid className="h-5 w-5" />
              </Button>
              <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('list')} aria-label="List view">
                <ListCollapse className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {filteredAdminProducts.length > 0 ? (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredAdminProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  showAdminActions={true}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              {searchTerm ? `No products found matching "${searchTerm}".` : "No products added yet. Use the form above to add new products."}
            </p>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
