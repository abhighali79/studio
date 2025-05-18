import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function HomePage() {
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
              <Link href="/dashboard/user">View Products</Link>
            </Button>
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
              Explore our product catalog or get in touch for a custom solution.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-x-2 flex">
            <Button asChild className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/dashboard/user">
                <Zap className="mr-2 h-4 w-4" /> Explore Products
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
