import React, { useEffect, useState } from 'react';
import FeaturedProducts from './FeaturedProducts';
import { getFeaturedProducts } from './api';
import { Product } from './types';

const MarketplaceHome: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getFeaturedProducts();
      setFeaturedProducts(products);
    };
    fetchProducts();
  }, []);

  return (
    <div className="marketplace-home">
      <h2>Welcome to Fibb.ai Marketplace</h2>
      <p>Discover high-quality AI-generated visual assets for your projects.</p>
      <FeaturedProducts products={featuredProducts} />
    </div>
  );
};

export default MarketplaceHome;