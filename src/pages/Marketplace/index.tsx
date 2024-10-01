import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MarketplaceHome from './MarketplaceHome';
import LoRAsPage from './pages/LoRAsPage';
import DatasetsPage from './pages/DatasetsPage';
import WorkflowsPage from './pages/WorkflowsPage';

const Marketplace: React.FC = () => {
  return (
    <Routes>
      <Route index element={<MarketplaceHome />} />
      <Route path="loras" element={<LoRAsPage />} />
      <Route path="datasets" element={<DatasetsPage />} />
      <Route path="workflows" element={<WorkflowsPage />} />
    </Routes>
  );
};

export default Marketplace;