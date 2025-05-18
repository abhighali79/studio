
"use client";

// useState and useEffect removed as products state is no longer needed
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Zap } from 'lucide-react';
// ProductCard and Skeleton removed as they are no longer used in this file

export default function HomePage() {
  // products state and useEffect for loading mockProducts removed

  return (
    <div className="flex flex-col items-center space-y-16">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-background rounded-xl shadow-md">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary mb-6">
                Welcome to Sai Infotech
              </h1>
              <p className="text-muted-foreground md:text-xl lg:text-lg xl:text-xl mb-8 md:mx-0">
                Innovative technology solutions by Sai Infotech. Discover our products and services designed to elevate your business.
              </p>
              <div className="flex justify-center md:justify-start">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/dashboard/user">View All Products</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="relative w-full aspect-[7/5] max-w-md sm:max-w-lg rounded-xl overflow-hidden">
                <Image
                  src="https://cdni.iconscout.com/illustration/premium/thumb/computer-repair-and-maintenance-illustration-download-in-svg-png-gif-file-formats--settings-installation-computers-functions-pack-science-technology-illustrations-8181570.png"
                  alt="Modern Tech Illustration"
                  fill
                  objectFit="cover"
                  data-ai-hint="tech illustration"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Computer Repairs Section */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter text-primary md:text-4xl/tight">
              Expert Computer Repairs
            </h2>
            <p className="text-muted-foreground md:text-lg">
              We offer a wide range of computer repair services.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-md">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Computer repair service"
                fill
                objectFit="cover"
                data-ai-hint="computer repair"
              />
            </div>
            <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-md">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Laptop maintenance"
                fill
                objectFit="cover"
                data-ai-hint="laptop maintenance"
              />
            </div>
            <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-md">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Hardware troubleshooting"
                fill
                objectFit="cover"
                data-ai-hint="hardware troubleshooting"
              />
            </div>
          </div>
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
