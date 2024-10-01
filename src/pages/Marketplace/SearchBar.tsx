import React, { useState, useCallback } from 'react';
import { generateClient } from 'aws-amplify/api';
import { GraphQLResult } from '@aws-amplify/api';
import { debounce } from 'lodash';
import { Product } from './types';

const client = generateClient();

// Define the search query
const searchProducts = `
  query SearchProducts($filter: SearchableProductFilterInput, $sort: [SearchableProductSortInput], $limit: Int) {
    searchProducts(filter: $filter, sort: $sort, limit: $limit) {
      items {
        id
        name
        type
        price
        imageUrl
      }
    }
  }
`;

interface SearchBarProps {
  onResultsFound: (products: Product[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onResultsFound }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = async (term: string) => {
    if (!term) {
      onResultsFound([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await client.graphql({
        query: searchProducts,
        variables: {
          filter: {
            or: [
              { name: { matchPhrasePrefix: term } },
              { description: { matchPhrasePrefix: term } }
            ]
          },
          limit: 20
        }
      }) as GraphQLResult<{ searchProducts: { items: Product[] } }>;

      const products = response.data?.searchProducts.items || [];
      onResultsFound(products);
    } catch (err) {
      console.error('Error searching products:', err);
      setError('An error occurred while searching. Please try again.');
      onResultsFound([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce the search to avoid making too many API calls
  const debouncedSearch = useCallback(debounce(performSearch, 300), []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    debouncedSearch(newSearchTerm);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleInputChange}
        className="search-input"
      />
      {isLoading && <span className="loading-indicator">Searching...</span>}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default SearchBar;