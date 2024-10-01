import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const dynamoDb = new DynamoDB.DocumentClient();
const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE || '';

export const getProducts: APIGatewayProxyHandler = async (event) => {
  try {
    const result = await dynamoDb.scan({ TableName: PRODUCTS_TABLE }).promise();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Could not fetch products' }),
    };
  }
};

export const getFeaturedProducts: APIGatewayProxyHandler = async (event) => {
  try {
    const result = await dynamoDb.scan({
      TableName: PRODUCTS_TABLE,
      FilterExpression: 'featured = :featured',
      ExpressionAttributeValues: { ':featured': true },
    }).promise();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Could not fetch featured products' }),
    };
  }
};

export const createProduct: APIGatewayProxyHandler = async (event) => {
  try {
    const data = JSON.parse(event.body || '{}');
    const product = {
      id: uuidv4(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    await dynamoDb.put({
      TableName: PRODUCTS_TABLE,
      Item: product,
    }).promise();
    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    };
  } catch (error) {
    console.error('Error creating product:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Could not create the product' }),
    };
  }
};