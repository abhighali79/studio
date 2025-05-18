import Image from 'next/image';
import type { Product } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ExternalLink } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  showAdminActions?: boolean;
  onDelete?: (productId: string) => void;
}

export function ProductCard({ product, showAdminActions = false, onDelete }: ProductCardProps) {
  const whatsappNumber = "917411180528";
  const message = `Hello, I would like to order:\nProduct: ${product.name}\nBrand: ${product.brand}\nModel: ${product.model || 'N/A'}\nPrice: ₹${product.price}`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="p-0">
        <div className="aspect-video relative w-full">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={product.image_hint || "product technology"}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl mb-1">{product.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-1">
          {product.brand} {product.model && `- ${product.model}`}
        </CardDescription>
        {product.description && !showAdminActions && (
           <p className="text-sm mt-2 text-foreground/80 line-clamp-2">{product.description}</p>
        )}
         {product.description && showAdminActions && (
           <p className="text-sm mt-2 text-foreground/80">{product.description}</p>
        )}
      </CardContent>
      <CardFooter className="p-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <p className="text-2xl font-semibold text-primary">₹{product.price.toLocaleString()}</p>
        {showAdminActions ? (
          <div className="space-x-2">
            {/* Admin actions like Edit/Delete can be added here */}
            {onDelete && (
              <Button variant="destructive" size="sm" onClick={() => onDelete(product.id)}>
                Delete
              </Button>
            )}
          </div>
        ) : (
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <ShoppingCart className="mr-2 h-4 w-4" /> Order on WhatsApp
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
