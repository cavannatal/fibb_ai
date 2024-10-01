import axios from 'axios';
import { Product } from '../types';

const API_BASE_URL = 'CavanCesarFillMEIN'; // Replace with your API Gateway URL

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${API_BASE_URL}/products/featured`);
  return response.data;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${API_BASE_URL}/products`);
  return response.data;
};

export const createProduct = async (product: Omit<Product, 'id' | 'imageUrl'>): Promise<{ product: Product; uploadUrl: any }> => {
  const response = await axios.post<{ product: Product; uploadUrl: any }>(`${API_BASE_URL}/products`, product);
  return response.data;
};

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