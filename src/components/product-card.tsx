
import Image from 'next/image';
// Product type import removed
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { ShoppingCart, Trash2, GalleryHorizontalEnd, Info } from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// ProductCardProps interface removed

export function ProductCard({ product, showAdminActions = false, onDelete }) {
  const whatsappNumber = "917411180528";
  const message = `Hello Sai Infotech, I would like to inquire about the following product:
Product Name: ${product.name}
Brand: ${product.brand}
Model: ${product.model || 'N/A'}
Details: ${product.description || 'Please provide more details.'}
Reference: You can find this product on your website under the name "${product.name}".`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const primaryImage = product.images && product.images.length > 0 ? product.images[0] : 'https://placehold.co/600x400.png';

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full group">
      <CardHeader className="p-0 relative">
        <div className="aspect-video w-full">
          <Image
            src={primaryImage}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={product.image_hint || "product technology"}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        {product.images && product.images.length > 1 && !showAdminActions && (
           <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="sm" className="absolute bottom-2 right-2 opacity-90 hover:opacity-100">
                <GalleryHorizontalEnd className="mr-2 h-4 w-4" /> View Gallery ({product.images.length})
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[90vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-3xl p-0">
              <DialogHeader className="p-4 border-b">
                <DialogTitle>{product.name} - Image Gallery</DialogTitle>
                <DialogDescription>{product.brand} {product.model && `- ${product.model}`}</DialogDescription>
              </DialogHeader>
              <ScrollArea className="w-full whitespace-nowrap rounded-md">
                <div className="flex space-x-4 p-4">
                  {product.images.map((imgSrc, index) => (
                    <div key={index} className="relative shrink-0 w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] rounded-md overflow-hidden border">
                      <Image
                        src={imgSrc}
                        alt={`${product.name} - Image ${index + 1}`}
                        layout="fill"
                        objectFit="contain"
                      />
                       <Badge variant="outline" className="absolute bottom-2 right-2 bg-background/70 backdrop-blur-sm">{index + 1} / {product.images.length}</Badge>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl mb-1">{product.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-1">
          {product.brand} {product.model && `- ${product.model}`}
        </CardDescription>
        {product.description && (
           <p className={`text-sm mt-2 text-foreground/80 ${showAdminActions ? '' : 'line-clamp-2'}`}>{product.description}</p>
        )}
      </CardContent>
      <CardFooter className="p-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <div className="flex-grow">
          {!showAdminActions && <span className="text-sm text-muted-foreground">Contact for details</span>}
        </div>
        {showAdminActions ? (
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Info className="mr-2 h-4 w-4" /> View Images ({product.images?.length || 0})
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[90vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-3xl p-0">
                <DialogHeader className="p-4 border-b">
                  <DialogTitle>{product.name} - Image Gallery</DialogTitle>
                </DialogHeader>
                <ScrollArea className="w-full whitespace-nowrap rounded-md">
                  <div className="flex space-x-4 p-4">
                    {product.images && product.images.length > 0 ? product.images.map((imgSrc, index) => (
                      <div key={index} className="relative shrink-0 w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] rounded-md overflow-hidden border">
                        <Image src={imgSrc} alt={`${product.name} - Image ${index + 1}`} layout="fill" objectFit="contain" />
                        <Badge variant="outline" className="absolute bottom-2 right-2 bg-background/70 backdrop-blur-sm">{index + 1} / {product.images.length}</Badge>
                      </div>
                    )) : <p className="text-muted-foreground p-4">No images for this product.</p>}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </DialogContent>
            </Dialog>
            {onDelete && (
              <Button variant="destructive" size="sm" onClick={() => onDelete(product.id)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            )}
          </div>
        ) : (
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <ShoppingCart className="mr-2 h-4 w-4" /> Inquire on WhatsApp
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
