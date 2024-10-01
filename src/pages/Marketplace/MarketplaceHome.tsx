import React, { useState, useCallback } from 'react';
import { Search, Bell, MessageSquare, Tag, Home, Car, Shirt, Tv, Gift, Clipboard, TreeDeciduous, Database, Upload, UploadCloud, Grid, List } from 'lucide-react';
import { debounce } from 'lodash';
import { generateClient } from 'aws-amplify/api';
import { GraphQLResult } from '@aws-amplify/api';
import { motion } from 'framer-motion';

const client = generateClient();

interface Dataset {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  type: string;
  description: string;
}

const searchDatasets = `
  query SearchDatasets($filter: SearchableDatasetFilterInput, $sort: [SearchableDatasetSortInput], $limit: Int) {
    searchDatasets(filter: $filter, sort: $sort, limit: $limit) {
      items {
        id
        name
        type
        price
        imageUrl
        description
      }
    }
  }
`;

interface SubscriptionSwitchProps {
  isYearly: boolean;
  onToggle: () => void;
}

const SubscriptionSwitch: React.FC<SubscriptionSwitchProps> = ({ isYearly, onToggle }) => {
  return (
    <motion.div
      className="w-48 h-10 bg-gray-200 rounded-full p-1 cursor-pointer flex items-center relative"
      onClick={onToggle}
    >
      <motion.div
        className="w-24 h-8 bg-[#084248] rounded-full absolute"
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        style={{ left: isYearly ? 'calc(50% - 2px)' : '2px' }}
      />
      <div className="w-full h-full flex items-center justify-around relative z-10">
        <span className={`text-sm font-medium transition-colors duration-300 ${isYearly ? 'text-gray-600' : 'text-white'}`}>
          Monthly
        </span>
        <span className={`text-sm font-medium transition-colors duration-300 ${isYearly ? 'text-white' : 'text-gray-600'}`}>
          Annually
        </span>
      </div>
    </motion.div>
  );
};

const DatasetCard: React.FC<{ dataset: Dataset }> = ({ dataset }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
    <img src={dataset.imageUrl} alt={dataset.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="font-bold text-lg mb-2">{dataset.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{dataset.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-[#084248] font-bold">${dataset.price}</span>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{dataset.type}</span>
      </div>
    </div>
  </div>
);

const MarketplaceHome: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Dataset[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isYearlySubscription, setIsYearlySubscription] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const featuredDatasets: Dataset[] = [
    { id: '1', name: 'Urban Imagery Collection', price: 99, imageUrl: '/api/placeholder/400/300', type: 'Computer Vision', description: 'High-resolution urban imagery for object detection and segmentation tasks.' },
    { id: '2', name: 'Multilingual Corpus', price: 149, imageUrl: '/api/placeholder/400/300', type: 'NLP', description: 'Extensive multilingual text corpus for language modeling and translation.' },
    { id: '3', name: 'Environmental Sensor Data', price: 79, imageUrl: '/api/placeholder/400/300', type: 'Environmental', description: 'Time-series data from various environmental sensors for climate analysis.' },
    { id: '4', name: 'Social Media Trends', price: 129, imageUrl: '/api/placeholder/400/300', type: 'Social Media', description: 'Comprehensive dataset of social media trends and user behavior patterns.' },
  ];

  const categories = [
    { name: 'Computer Vision', icon: <Tv size={20} /> },
    { name: 'Natural Language Processing', icon: <MessageSquare size={20} /> },
    { name: 'Environmental', icon: <TreeDeciduous size={20} /> },
    { name: 'Social Media', icon: <Bell size={20} /> },
    { name: 'Bioinformatics', icon: <Database size={20} /> },
  ];

  const performSearch = async (term: string) => {
    // ... (search logic remains the same)
  };

  const debouncedSearch = useCallback(debounce(performSearch, 300), []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    debouncedSearch(newSearchTerm);
  };

  const handleSubscriptionToggle = () => {
    setIsYearlySubscription(!isYearlySubscription);
  };

  const displayedDatasets = searchResults.length > 0 ? searchResults : featuredDatasets;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-6">Dataset Market</h1>
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search datasets..."
              value={searchTerm}
              onChange={handleInputChange}
              className="w-full p-2 pl-10 border rounded-md"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          {isSearching && <p className="text-sm text-gray-500 mt-2">Searching...</p>}
          {searchError && <p className="text-sm text-red-500 mt-2">{searchError}</p>}
        </div>
        <div className="mb-6">
          <button className="w-full bg-[#084248] text-white p-2 rounded-md mb-2 flex items-center justify-center">
            <Upload size={20} className="mr-2" /> Upload Dataset
          </button>
          <button className="w-full bg-gray-200 text-gray-700 p-2 rounded-md flex items-center justify-center">
            <UploadCloud size={20} className="mr-2" /> Batch Upload
          </button>
        </div>
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Subscription Plan</h2>
          <SubscriptionSwitch
            isYearly={isYearlySubscription}
            onToggle={handleSubscriptionToggle}
          />
        </div>
        <div>
          <h2 className="font-semibold mb-2">Categories</h2>
          <ul>
            {categories.map((category, index) => (
              <li key={index} className="flex items-center mb-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {searchResults.length > 0 ? 'Search Results' : "Featured Datasets"}
          </h2>
          <div className="flex space-x-2">
            <button 
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#084248] text-white' : 'bg-gray-200'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={20} />
            </button>
            <button 
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#084248] text-white' : 'bg-gray-200'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={20} />
            </button>
          </div>
        </div>
        {searchResults.length === 0 && searchError === null && !isSearching && searchTerm && (
          <p className="text-sm text-gray-500 mb-4">No results found. Showing featured datasets.</p>
        )}
        <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {displayedDatasets.map((dataset) => (
            <DatasetCard key={dataset.id} dataset={dataset} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHome;