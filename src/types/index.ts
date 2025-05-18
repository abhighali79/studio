import type { LucideIcon } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  brand: string;
  model?: string;
  price: number;
  description?: string;
  image: string;
  image_hint?: string; 
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}
