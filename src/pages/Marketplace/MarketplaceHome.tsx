import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from './ProductList';
import { Product } from './types';

const MarketplaceHome: React.FC = () => {
  // In a real application, you might fetch featured products from an API
  // For now, we'll use dummy data
  const featuredProducts: Product[] = [
    { id: '1', name: 'Featured LoRA 1', type: 'lora', price: 9.99, imageUrl: 'path/to/image1.jpg', description: 'A high-quality LoRA model' },
    { id: '2', name: 'Premium Dataset', type: 'dataset', price: 19.99, imageUrl: 'path/to/image2.jpg', description: 'Curated dataset for AI training' },
    { id: '3', name: 'Efficient Workflow', type: 'workflow', price: 14.99, imageUrl: 'path/to/image3.jpg', description: 'Optimized workflow for image generation' },
  ];

  return (
    <div className="marketplace-home">
      <h1 className="text-3xl font-bold mb-6">Welcome to Fibb.ai Marketplace</h1>
      <p className="mb-8">Discover high-quality AI-generated visual assets for your projects.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link to="/datasets" className="block p-6 bg-white rounded-lg shadow hover:bg-gray-100">
          <h2 className="text-xl font-semibold mb-2">Datasets</h2>
          <p>Explore our curated datasets for AI training and fine-tuning.</p>
        </Link>
        <Link to="/loras" className="block p-6 bg-white rounded-lg shadow hover:bg-gray-100">
          <h2 className="text-xl font-semibold mb-2">LoRAs</h2>
          <p>Browse our collection of high-quality LoRA models.</p>
        </Link>
        <Link to="/fined-tuned" className="block p-6 bg-white rounded-lg shadow hover:bg-gray-100">
          <h2 className="text-xl font-semibold mb-2">Fine Tuned Models</h2>
          <p>Discover pre-configured workflows for specific image outputs.</p>
        </Link>
        <Link to="/workflows" className="block p-6 bg-white rounded-lg shadow hover:bg-gray-100">
          <h2 className="text-xl font-semibold mb-2">Workflows</h2>
          <p>Discover pre-configured workflows for specific image outputs.</p>
        </Link>
      </div>

      <ProductList products={featuredProducts} title="Featured Products" />
    </div>
  );
};

export default MarketplaceHome;