import { generateClient } from 'aws-amplify/api';
import { GraphQLQuery, GraphQLResult } from '@aws-amplify/api';
import { listProducts, createProduct } from './graphql/queries';
import { Product } from './types';

const client = generateClient();

interface ListProductsResponse {
  listProducts: {
    items: Product[];
  };
}

interface CreateProductResponse {
  createProduct: Product;
}

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const response = await client.graphql<GraphQLQuery<ListProductsResponse>>({
      query: listProducts,
      variables: {
        filter: { featured: { eq: true } }
      }
    });

    return response.data.listProducts.items || [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
};

export const addProduct = async (input: Omit<Product, 'id'>): Promise<Product | null> => {
  try {
    const response = await client.graphql<GraphQLQuery<CreateProductResponse>>({
      query: createProduct,
      variables: { input }
    });

    return response.data.createProduct || null;
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
};