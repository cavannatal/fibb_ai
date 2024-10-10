import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Search, Bell, MessageSquare, Tv, TreeDeciduous, Database, Grid, List, Layers, Brush, Cog, FileCode } from 'lucide-react';
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
  query SearchDatasets($filter: SearchableDatasetFilterInput, $sort: [SearchableDatasetSortInput], $limit: Int, $category: String) {
    searchDatasets(filter: $filter, sort: $sort, limit: $limit, category: $category) {
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

interface MarketplaceCategorySwitchProps {
  isBusiness: boolean;
  onToggle: () => void;
}

const MarketplaceCategorySwitch: React.FC<MarketplaceCategorySwitchProps> = ({ isBusiness, onToggle }) => (
  <motion.div
    className="w-48 h-10 bg-[#144a53] rounded-full p-1 cursor-pointer flex items-center relative"
    onClick={onToggle}
  >
    <motion.div
      className="w-24 h-8 bg-[#cbf59a] rounded-full absolute"
      layout
      transition={{ type: "spring", stiffness: 700, damping: 30 }}
      style={{ left: isBusiness ? 'calc(50% - 2px)' : '2px' }}
    />
    <div className="w-full h-full flex items-center justify-around relative z-10">
      <span className={`text-sm font-medium transition-colors duration-300 ${isBusiness ? 'text-white' : 'text-[#004948]'}`}>
        Creator
      </span>
      <span className={`text-sm font-medium transition-colors duration-300 ${isBusiness ? 'text-[#004948]' : 'text-white'}`}>
        Business
      </span>
    </div>
  </motion.div>
);

const DatasetCard: React.FC<{ dataset: Dataset }> = ({ dataset }) => (
  <div className="bg-[#144a53] rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
    <img src={dataset.imageUrl} alt={dataset.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="font-bold text-lg mb-2 text-white">{dataset.name}</h3>
      <p className="text-sm text-[#cbf59a] mb-2">{dataset.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-[#cbf59a] font-bold">${dataset.price}</span>
        <span className="text-xs bg-[#285a62] text-white px-2 py-1 rounded-full">{dataset.type}</span>
      </div>
    </div>
  </div>
);

const MarketplaceHome: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Dataset[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isBusinessSubscription, setIsBusinessSubscription] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const featuredDatasets: Dataset[] = [
    { id: '1', name: 'Urban Imagery Collection', price: 99, imageUrl: '/api/placeholder/400/300', type: 'Computer Vision', description: 'High-resolution urban imagery for object detection and segmentation tasks.' },
    { id: '2', name: 'Multilingual Corpus', price: 149, imageUrl: '/api/placeholder/400/300', type: 'NLP', description: 'Extensive multilingual text corpus for language modeling and translation.' },
    { id: '3', name: 'Environmental Sensor Data', price: 79, imageUrl: '/api/placeholder/400/300', type: 'Environmental', description: 'Time-series data from various environmental sensors for climate analysis.' },
    { id: '4', name: 'Social Media Trends', price: 129, imageUrl: '/api/placeholder/400/300', type: 'Social Media', description: 'Comprehensive dataset of social media trends and user behavior patterns.' },
  ];

  const creatorContent: Dataset[] = [
    { id: '5', name: 'Artistic Style LoRA', price: 49, imageUrl: '/api/placeholder/400/300', type: 'Style LoRA', description: 'LoRA model for transferring unique artistic styles to images.' },
    { id: '6', name: 'Efficient Text-to-Image Workflow', price: 89, imageUrl: '/api/placeholder/400/300', type: 'Workflow', description: 'Optimized workflow for generating high-quality images from text descriptions.' },
    { id: '7', name: 'Character Consistency LoRA', price: 59, imageUrl: '/api/placeholder/400/300', type: 'LoRA Model', description: 'LoRA model for maintaining character consistency across multiple generations.' },
    { id: '8', name: 'High-Fidelity Audio Dataset', price: 119, imageUrl: '/api/placeholder/400/300', type: 'Dataset', description: 'Curated dataset of high-fidelity audio samples for various applications.' },
  ];

  const creatorCategories = [
    { name: 'LoRA Models', icon: <Layers size={20} /> },
    { name: 'High-Quality Datasets', icon: <Database size={20} /> },
    { name: 'Workflows', icon: <Cog size={20} /> },
    { name: 'Style LoRAs', icon: <Brush size={20} /> },
  ];

  const businessCategories = [
    { name: 'Computer Vision', icon: <Tv size={20} /> },
    { name: 'Natural Language Processing', icon: <MessageSquare size={20} /> },
    { name: 'Environmental', icon: <TreeDeciduous size={20} /> },
    { name: 'Social Media', icon: <Bell size={20} /> },
    { name: 'Bioinformatics', icon: <Database size={20} /> },
  ];

  const performSearch = useCallback(async (term: string, category: string | null) => {
    if (!term && !category) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const response = await client.graphql({
        query: searchDatasets,
        variables: {
          filter: term ? {
            or: [
              { name: { matchPhrasePrefix: term } },
              { description: { matchPhrasePrefix: term } }
            ]
          } : undefined,
          category: category || undefined,
          limit: 20
        }
      }) as GraphQLResult<{ searchDatasets: { items: Dataset[] } }>;

      const datasets = response.data?.searchDatasets.items || [];
      setSearchResults(datasets);
    } catch (err) {
      console.error('Error searching datasets:', err);
      setSearchError('An error occurred while searching. Please try again.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const debouncedSearchRef = useRef(debounce((term: string, category: string | null) => performSearch(term, category), 300));

  useEffect(() => {
    debouncedSearchRef.current = debounce((term: string, category: string | null) => performSearch(term, category), 300);
    return () => {
      debouncedSearchRef.current.cancel();
    };
  }, [performSearch]);

  useEffect(() => {
    debouncedSearchRef.current(searchTerm, selectedCategory);
  }, [searchTerm, selectedCategory]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubscriptionToggle = () => {
    setIsBusinessSubscription(!isBusinessSubscription);
    setSelectedCategory(null);
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName === selectedCategory ? null : categoryName);
  };

  const filterItemsByCategory = (items: Dataset[]) => {
    if (!selectedCategory) return items;
    return items.filter(item => item.type === selectedCategory);
  };

  const displayedItems = searchResults.length > 0 
    ? filterItemsByCategory(searchResults)
    : filterItemsByCategory(isBusinessSubscription ? featuredDatasets : creatorContent);

  const currentCategories = isBusinessSubscription ? businessCategories : creatorCategories;

  return (
    <div className="flex bg-gradient-to-r from-[#093f48] to-[#004948] text-white min-h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-[#144a53] p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-[#cbf59a]">AI Content Market</h1>
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
              className="w-full p-2 pl-10 border rounded-md bg-[#285a62] text-white placeholder-[#a0d0a0] border-[#cbf59a]"
            />
            <Search className="absolute left-3 top-2.5 text-[#cbf59a]" size={20} />
          </div>
          {isSearching && <p className="text-sm text-[#cbf59a] mt-2">Searching...</p>}
          {searchError && <p className="text-sm text-red-400 mt-2">{searchError}</p>}
        </div>
        <div className="mb-6">
          <h2 className="font-semibold mb-2 text-[#cbf59a]">Market Type</h2>
          <MarketplaceCategorySwitch
            isBusiness={isBusinessSubscription}
            onToggle={handleSubscriptionToggle}
          />
        </div>
        <div>
          <h2 className="font-semibold mb-2 text-[#cbf59a]">Categories</h2>
          <ul>
            {currentCategories.map((category, index) => (
              <li 
                key={index} 
                className={`flex items-center mb-2 p-2 hover:bg-[#285a62] rounded cursor-pointer ${
                  selectedCategory === category.name ? 'bg-[#285a62]' : ''
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <span className="text-[#cbf59a]">{category.icon}</span>
                <span className="ml-2">{category.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#cbf59a]">
            {searchResults.length > 0 ? 'Search Results' : `Featured ${isBusinessSubscription ? 'Datasets' : 'Creator Content'}`}
            {selectedCategory && ` - ${selectedCategory}`}
          </h2>
          <div className="flex space-x-2">
            <button 
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#cbf59a] text-[#004948]' : 'bg-[#285a62] text-white'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={20} />
            </button>
            <button 
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#cbf59a] text-[#004948]' : 'bg-[#285a62] text-white'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={20} />
            </button>
          </div>
        </div>
        {displayedItems.length === 0 && (
          <p className="text-sm text-[#cbf59a] mb-4">No items found for the selected category or search term.</p>
        )}
        <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {displayedItems.map((item) => (
            <DatasetCard key={item.id} dataset={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHome;