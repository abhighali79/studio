
import React from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SiteFooter() {
  const whatsappNumber = "917411180528";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Sai Infotech, I have a query.")}`;

  return (
    <footer className="border-t border-border/40 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-sm text-muted-foreground mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Sai Infotech. All rights reserved.
        </p>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <p className="text-sm text-muted-foreground">Contact us for support:</p>
          <Button variant="outline" asChild>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
