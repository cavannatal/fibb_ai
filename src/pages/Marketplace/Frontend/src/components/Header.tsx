// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header: React.FC = () => (
  <header className="marketplace-header">
    <h1>Fibb.ai Marketplace</h1>
    <nav>
      <ul>
        <li><Link to="/marketplace">Home</Link></li>
        <li><Link to="/marketplace/loras">LoRAs</Link></li>
        <li><Link to="/marketplace/datasets">Datasets</Link></li>
        <li><Link to="/marketplace/workflows">Workflows</Link></li>
      </ul>
    </nav>
    <SearchBar />
  </header>
);

export default Header;

// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => (
  <footer className="marketplace-footer">
    <p>&copy; 2024 Fibb.ai Marketplace. All rights reserved.</p>
  </footer>
);

export default Footer;

// src/components/ProductCard.tsx
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className="product-card">
    <img src={product.imageUrl} alt={product.name} />
    <h4>{product.name}</h4>
    <p>Type: {product.type}</p>
    <p>Price: ${product.price}</p>
    <button>View Details</button>
  </div>
);

export default ProductCard;

// src/components/FeaturedProducts.tsx
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => (
  <div className="featured-products">
    <h3>Featured Products</h3>
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
);

export default FeaturedProducts;

// src/components/SearchBar.tsx
import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Implement search functionality
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search marketplace"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;