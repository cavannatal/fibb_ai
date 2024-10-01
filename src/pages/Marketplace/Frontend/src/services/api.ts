import axios from 'axios';
import { Product } from '../types';

// fill in with aws later instead of local 
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(`${API_BASE_URL}/products/featured`);
    return response.data;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${API_BASE_URL}/products`);
  return response.data;
};

export const createProduct = async (product: Omit<Product, 'id' | 'imageUrl'>): Promise<{ product: Product; uploadUrl: any }> => {
  const response = await axios.post<{ product: Product; uploadUrl: any }>(`${API_BASE_URL}/products`, product);
  return response.data;
};

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
});


export const uploadProductImage = async (uploadUrl: any, file: File): Promise<void> => {
  const formData = new FormData();
  Object.entries(uploadUrl.fields).forEach(([key, value]) => {
    formData.append(key, value as string);
  });
  formData.append('file', file);

  await axios.post(uploadUrl.url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};