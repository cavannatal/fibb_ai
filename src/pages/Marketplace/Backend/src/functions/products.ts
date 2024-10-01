import { APIGatewayProxyHandler } from 'aws-lambda';
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import { getProducts, getFeaturedProducts, createProduct } from '../services/dynamodb';
import { createPresignedPost } from '../services/s3';
import { Product } from '../types';

export const getProductsHandler: APIGatewayProxyHandler = async () => {
  try {
    const products = await getProducts();
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching products' }),
    };
  }
};

export const getFeaturedProductsHandler: APIGatewayProxyHandler = async () => {
  try {
    const products = await getFeaturedProducts();
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching featured products' }),
    };
  }
};

export const createProductHandler: APIGatewayProxyHandler = middy(async (event) => {
  try {
    const product: Product = event.body as any;
    const newProduct = await createProduct(product);
    
    // Generate presigned URL for image upload
    const imageKey = `products/${newProduct.id}/${Date.now()}.jpg`;
    const presignedPost = await createPresignedPost(imageKey);

    return {
      statusCode: 201,
      body: JSON.stringify({ product: newProduct, uploadUrl: presignedPost }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating product' }),
    };
  }
}).use(jsonBodyParser());

export const getProducts = getProductsHandler;
export const getFeaturedProducts = getFeaturedProductsHandler;
export const createProduct = createProductHandler;