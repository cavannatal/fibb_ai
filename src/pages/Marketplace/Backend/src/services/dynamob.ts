import { DynamoDB } from 'aws-sdk';
import { Product } from '../types';

const dynamoDb = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.PRODUCTS_TABLE || '';

export const getProducts = async (): Promise<Product[]> => {
  const params = {
    TableName: TABLE_NAME,
  };

  const result = await dynamoDb.scan(params).promise();
  return result.Items as Product[];
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const params = {
    TableName: TABLE_NAME,
    FilterExpression: 'featured = :featured',
    ExpressionAttributeValues: {
      ':featured': true,
    },
  };

  const result = await dynamoDb.scan(params).promise();
  return result.Items as Product[];
};

export const createProduct = async (product: Product): Promise<Product> => {
  const params = {
    TableName: TABLE_NAME,
    Item: product,
  };

  await dynamoDb.put(params).promise();
  return product;
};