export interface Product {
    id: number;
    name: string;
    type: 'lora' | 'dataset' | 'workflow';
    price: number;
    imageUrl: string;
  }