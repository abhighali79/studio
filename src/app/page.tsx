
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import type { Product } from '@/types';
import { ProductCard } from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';

// Mock product data - price removed
const mockProducts: Product[] = [
  { id: 'hp-1', name: 'Laptop Pro X', brand: 'TechBrand', model: 'TB-LPX-15', description: 'High-performance laptop for professionals.', images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'], image_hint: 'laptop tech' },
  { id: 'hp-2', name: 'Smartphone Ultra', brand: 'ConnectMe', model: 'CM-SU-67', description: 'Feature-rich smartphone with a stunning display.', images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'], image_hint: 'smartphone mobile' },
  { id: 'hp-3', name: 'Wireless Headset', brand: 'AudioPure', model: 'AP-WH-V2', description: 'Immersive sound quality with noise cancellation.', images: ['https://placehold.co/600x400.png'], image_hint: 'headset audio' },
  { id: 'hp-4', name: 'Office Printer', brand: 'PrintFast', model: 'PF-M200', description: 'Reliable and efficient multifunction printer.', images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'], image_hint: 'printer office' },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(mockProducts); 
      setLoading(false);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-16">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 text-center bg-gradient-to-br from-primary/10 via-background to-background rounded-xl shadow-md">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary mb-6">
            Welcome to Sai Infotech
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mb-8">
            Innovative technology solutions by Sai Infotech. Discover our products and services designed to elevate your business.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/dashboard/user">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter text-primary md:text-4xl/tight">
              Featured Products
            </h2>
            <p className="text-muted-foreground md:text-lg">
              Check out some of our popular items.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col space-y-3 p-4 border rounded-lg shadow-md">
                  <Skeleton className="h-[200px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                    {/* Skeleton for price removed */}
                    {/* <Skeleton className="h-8 w-[100px] mt-2" /> */}
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No products available at the moment. Please check back later.</p>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-12 md:py-16 bg-accent/10 rounded-xl shadow-md">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter text-accent md:text-4xl/tight">
              Ready to Get Started?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our full product catalog or get in touch for a custom solution.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-x-2 flex">
            <Button asChild className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/dashboard/user">
                <Zap className="mr-2 h-4 w-4" /> Explore All Products
              </Link>
            </Button>
             <Button variant="outline" asChild className="flex-1 border-accent text-accent hover:bg-accent/10">
              <a href="https://wa.me/917411180528?text=Hello%20Sai%20Infotech%2C%20I%20would%20like%20to%20discuss%20my%20project." target="_blank" rel="noopener noreferrer">
                Contact Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
