// src/pages/MarketplaceHome.tsx
import React, { useEffect, useState } from 'react';
import FeaturedProducts from '../components/FeaturedProducts';
import { getFeaturedProducts } from '../services/api';
import { Product } from '../types';

const MarketplaceHome: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    getFeaturedProducts().then(setFeaturedProducts);
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

// src/pages/LoRAsPage.tsx
import React from 'react';

const LoRAsPage: React.FC = () => (
  <div className="loras-page">
    <h2>LoRAs</h2>
    <p>Browse our collection of high-quality LoRA models.</p>
    {/* Add LoRA listings here */}
  </div>
);

export default LoRAsPage;

// src/pages/DatasetsPage.tsx
import React from 'react';

const DatasetsPage: React.FC = () => (
  <div className="datasets-page">
    <h2>Datasets</h2>
    <p>Explore our curated datasets for AI training and fine-tuning.</p>
    {/* Add dataset listings here */}
  </div>
);

export default DatasetsPage;

// src/pages/WorkflowsPage.tsx
import React from 'react';

const WorkflowsPage: React.FC = () => (
  <div className="workflows-page">
    <h2>Workflows</h2>
    <p>Discover pre-configured workflows for specific image outputs.</p>
    {/* Add workflow listings here */}
  </div>
);

export default WorkflowsPage;