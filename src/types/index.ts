
export interface Product {
  id: string;
  name: string;
  brand: string;
  model?: string;
  // price: number; // Price removed
  description?: string;
  images: string[];
  image_hint?: string;
}
