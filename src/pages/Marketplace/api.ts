import { API, graphqlOperation } from 'aws-amplify';
import { listProducts } from './graphql/queries';
import { Product } from './types';

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const response: any = await API.graphql(graphqlOperation(listProducts, {
      filter: { featured: { eq: true } }
    }));
    return response.data.listProducts.items;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
};

export const createProduct = async (input: Omit<Product, 'id'>): Promise<Product | null> => {
  try {
    const response: any = await API.graphql(graphqlOperation(createProduct, { input }));
    return response.data.createProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
};