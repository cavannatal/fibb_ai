import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import awsConfig from './aws-exports';
import MarketplaceHome from './MarketplaceHome';
import LoRAsPage from './LoRAsPage';
import DatasetsPage from './DatasetsPage';
import WorkflowsPage from './WorkflowsPage';

const Marketplace: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    Amplify.configure(awsConfig);
  }, []);

  return (
    <div className="marketplace">
      <Routes>
        <Route path="/marketplace" element={<MarketplaceHome />} />
        <Route path="/loras" element={<LoRAsPage />} />
        <Route path="/datasets" element={<DatasetsPage />} />
        <Route path="/workflows" element={<WorkflowsPage />} />
      </Routes>
    </div>
  );
};

export default Marketplace;