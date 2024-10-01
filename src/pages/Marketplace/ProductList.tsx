import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { GraphQLResult } from '@aws-amplify/api';
import { Product } from './types';
import ProductCard from './ProductCard';

const client = generateClient();

const listProducts = `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        price
        imageUrl
        description
      }
      nextToken
    }
  }
`;

interface ProductListProps {
  products?: Product[] | null;
  title?: string;
}

interface ListProductsQuery {
  listProducts: {
    items: Product[];
    nextToken: string | null;
  };
}

const ProductList: React.FC<ProductListProps> = ({ products: initialProducts, title = "Products" }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(!initialProducts);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (token: string | null = null) => {
    if (initialProducts && !token) return; // Don't fetch if products were passed as props and it's not a "load more" action

    setLoading(token ? false : true);
    setLoadingMore(token ? true : false);
    setError(null);

    try {
      const response = await client.graphql<ListProductsQuery>({
        query: listProducts,
        variables: {
          limit: 20,
          nextToken: token
        }
      });

      // Check if response is GraphQLResult
      if ('data' in response) {
        const newProducts = response.data?.listProducts.items || [];
        setProducts(prev => token ? [...prev, ...newProducts] : newProducts);
        setNextToken(response.data?.listProducts.nextToken || null);
      } else {
        // Handle the case where response doesn't have 'data' property
        console.error('Unexpected response structure:', response);
        setError('An unexpected error occurred. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (!initialProducts) {
      fetchProducts();
    }
  }, [initialProducts]);

  const loadMore = () => {
    if (nextToken && !loadingMore) {
      fetchProducts(nextToken);
    }
  };

  if (loading && products.length === 0) {
    return <div aria-live="polite" aria-busy="true">Loading products...</div>;
  }

  if (error) {
    return <div aria-live="assertive" role="alert">Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div className="product-list">
      <h2>{title}</h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {nextToken && (
        <button 
          onClick={loadMore} 
          className="load-more-button"
          disabled={loadingMore}
        >
          {loadingMore ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default ProductList;