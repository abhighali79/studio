"use client";

import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';

interface AddProductFormProps {
  onAddProduct: (product: Product) => void;
}

export function AddProductForm({ onAddProduct }: AddProductFormProps) {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !brand || !price || !imageFile) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (Name, Brand, Price, Image).",
        variant: "destructive",
      });
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(), // Simple ID generation
      name,
      brand,
      model,
      price: parseFloat(price),
      description,
      image: imagePreview || 'https://placehold.co/600x400.png', // Use preview, or fallback. Real app would upload.
      image_hint: `${name} ${brand}`.toLowerCase().substring(0,20) // Simple hint
    };

    onAddProduct(newProduct);
    toast({
      title: "Success!",
      description: `Product "${newProduct.name}" added successfully.`,
    });

    // Reset form
    setName('');
    setBrand('');
    setModel('');
    setPrice('');
    setDescription('');
    setImageFile(null);
    setImagePreview(null);
    // Reset file input visually if possible (or tell user it's reset)
    const fileInput = e.currentTarget.elements.namedItem('image') as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Add New Product</CardTitle>
        <CardDescription>Fill in the details to add a new product to the catalog.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Laptop Pro X" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Brand *</Label>
              <Input id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g., TechBrand" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input id="model" value={model} onChange={(e) => setModel(e.target.value)} placeholder="e.g., TB-LPX-15" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., 75000" required min="0" step="0.01" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description of the product" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Product Image *</Label>
            <Input id="image" type="file" accept="image/*" onChange={handleImageChange} required />
            {imagePreview && (
              <div className="mt-2 relative w-full h-48 border rounded-md overflow-hidden">
                <Image src={imagePreview} alt="Image preview" layout="fill" objectFit="contain" />
              </div>
            )}
          </div>
          
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Add Product</Button>
        </form>
      </CardContent>
    </Card>
  );
}
