export interface Product {
    id: string;
    name: string;
    type: 'lora' | 'dataset' | 'workflow';
    price: number;
    imageUrl: string;
    featured: boolean;
  }