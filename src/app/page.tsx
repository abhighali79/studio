
"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Zap } from 'lucide-react';

export default function HomePage() {

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
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4jKTO9koXKSD8mlq2zYelymzNHtYAMaJBUg&s"
                alt="Computer repair service"
                fill
                objectFit="cover"
              />
            </div>
            <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-md">
              <Image
                src="https://5.imimg.com/data5/SELLER/Default/2022/3/QV/LY/RL/4697972/computer-repairing-service.jpg"
                alt="Laptop maintenance"
                fill
                objectFit="cover"
              />
            </div>
            <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-md">
              <Image
                src="https://content.jdmagicbox.com/v2/comp/bangalore/t5/080pxx80.xx80.190221182740.p6t5/catalogue/a-s-computer-service-bangalore-0ijh6drbjo.jpg"
                alt="Hardware troubleshooting"
                fill
                objectFit="cover"
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

      {/* Our Location Section */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter text-primary md:text-4xl/tight">
              Our Location
            </h2>
            <p className="text-muted-foreground md:text-lg">
              Visit us at our store.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full aspect-video md:aspect-square rounded-xl overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.2846316897912!2d74.947667!3d16.511722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc0cbc33d85e78b%3A0xa06691430d32aaed!2sSAI%20INFOTECH!5e0!3m2!1sen!2sin!4v1747593065066!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border:0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sai Infotech Location"
              ></iframe>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold text-primary mb-4">Shop Address</h3>
              <p className="text-lg text-muted-foreground">
                Athani-Gokak Rd, near HVH College, <br />
                Harugeri, Karnataka 591220
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
