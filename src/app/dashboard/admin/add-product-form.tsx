
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';
import { X } from 'lucide-react';

export function AddProductForm({ onAddProduct }) {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]); // Will store data URIs

  const handleImageChange = async (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImageFiles(prevFiles => [...prevFiles, ...filesArray]);
      
      const newPreviewsPromises = filesArray.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result && typeof reader.result === 'string') {
              resolve(reader.result);
            } else {
              reject(new Error('Failed to read file as data URI.'));
            }
          };
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      });

      try {
        const resolvedPreviews = await Promise.all(newPreviewsPromises);
        setImagePreviews(prevPreviews => [...prevPreviews, ...resolvedPreviews]);
      } catch (error) {
        console.error("Error converting files to data URIs:", error);
        toast({
          title: "Image Upload Error",
          description: "Could not process one or more images. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const removeImage = (index) => {
    setImageFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !brand || imagePreviews.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (Name, Brand) and upload at least one image.",
        variant: "destructive",
      });
      return;
    }

    const nameWords = name.split(' ');
    const brandWords = brand.split(' ');
    let hintParts = [];
    if (brandWords.length > 0 && brandWords[0]) {
      hintParts.push(brandWords[0].toLowerCase());
    }
    if (nameWords.length > 0 && nameWords[0]) {
      hintParts.push(nameWords[0].toLowerCase());
    }
    const imageHint = hintParts.slice(0, 2).join(' ').trim() || "product tech";

    const newProduct = {
      id: Date.now().toString(), 
      name,
      brand,
      model,
      description,
      images: imagePreviews.length > 0 ? imagePreviews : ['https://placehold.co/600x400.png'], 
      image_hint: imageHint
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
    setDescription('');
    setImageFiles([]);
    setImagePreviews([]);
    const fileInput = e.currentTarget.elements.namedItem('images');
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
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description of the product" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="images">Product Images * (Select one or more)</Label>
            <Input id="images" type="file" accept="image/*" onChange={handleImageChange} multiple />
            {imagePreviews.length > 0 && (
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group border rounded-md overflow-hidden aspect-square">
                    <Image src={preview} alt={`Preview ${index + 1}`} layout="fill" objectFit="contain" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Add Product</Button>
        </form>
      </CardContent>
    </Card>
  );
}
