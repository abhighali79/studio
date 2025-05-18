
export interface Product {
  id: string;
  name: string;
  brand: string;
  model?: string;
  price: number;
  description?: string;
  images: string[]; // Changed from image: string
  image_hint?: string; // This hint can refer to the primary image (images[0])
}
