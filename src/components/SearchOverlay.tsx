import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, X, Tag } from 'lucide-react';
import { useAppData } from '../contexts/AppDataContext';
import { Location, LocationCategory } from '../types';

interface SearchOverlayProps {
  onClose: () => void;
}

const SearchOverlay = ({ onClose }: SearchOverlayProps) => {
  const { t } = useTranslation();
  const { locations, setSelectedLocation } = useAppData();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'categories' | 'results'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<LocationCategory | 'all'>('all');
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation on mount
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);
  
  // Filter locations when query or category changes
  useEffect(() => {
    let filtered = [...locations];
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(location => location.category === selectedCategory);
    }
    
    if (query.trim() !== '') {
      const searchQuery = query.toLowerCase().trim();
      filtered = filtered.filter(location => 
        location.name.toLowerCase().includes(searchQuery) || 
        (location.description && location.description.toLowerCase().includes(searchQuery))
      );
    }
    
    setFilteredLocations(filtered);
    
    // Switch to results tab if we have a query
    if (query.trim() !== '') {
      setActiveTab('results');
    }
  }, [query, selectedCategory, locations]);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };
  
  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    handleClose();
  };
  
  const handleCategorySelect = (category: LocationCategory | 'all') => {
    setSelectedCategory(category);
    setActiveTab('results');
  };
  
  const getCategoryIcon = (category: LocationCategory) => {
    switch (category) {
      case 'building':
        return <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'dormitory':
        return <Tag className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case 'library':
        return <Tag className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'cafeteria':
        return <Tag className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
      case 'service':
        return <Tag className="w-5 h-5 text-orange-600 dark:text-orange-400" />;
      default:
        return <Tag className="w-5 h-5" />;
    }
  };
  
  // Get translated category name
  const getCategoryName = (category: LocationCategory | 'all') => {
    return t(`categories_${category}`);
  };
  
  return (
    <div className={`
      fixed inset-0 z-30 bg-white dark:bg-gray-900
      transform ${isVisible ? 'translate-y-0' : 'translate-y-full'}
      transition-transform duration-300 ease-in-out
    `}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <button 
            onClick={handleClose}
            className="p-2 -m-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-2 pl-9 pr-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`
              flex-1 py-3 text-sm font-medium
              ${activeTab === 'categories' 
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                : 'text-gray-600 dark:text-gray-400'}
            `}
            onClick={() => setActiveTab('categories')}
          >
            {t('categories')}
          </button>
          <button
            className={`
              flex-1 py-3 text-sm font-medium
              ${activeTab === 'results' 
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                : 'text-gray-600 dark:text-gray-400'}
            `}
            onClick={() => setActiveTab('results')}
          >
            {t('results')}
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'categories' ? (
            <div className="p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleCategorySelect('all')}
                    className={`
                      w-full text-left px-4 py-3 rounded-lg flex items-center justify-between
                      ${selectedCategory === 'all' 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}
                      transition-colors
                    `}
                  >
                    <span className="font-medium">{t('categories_all')}</span>
                    <Tag className="w-5 h-5" />
                  </button>
                </li>
                {['building', 'dormitory', 'library', 'cafeteria', 'service'].map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => handleCategorySelect(category as LocationCategory)}
                      className={`
                        w-full text-left px-4 py-3 rounded-lg flex items-center justify-between
                        ${selectedCategory === category 
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}
                        transition-colors
                      `}
                    >
                      <span className="font-medium">{getCategoryName(category as LocationCategory)}</span>
                      {getCategoryIcon(category as LocationCategory)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-4">
              {filteredLocations.length > 0 ? (
                <ul className="space-y-2">
                  {filteredLocations.map(location => (
                    <li key={location.id}>
                      <button
                        onClick={() => handleLocationSelect(location)}
                        className="w-full text-left px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="font-medium">{location.name}</div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                          <span className="capitalize">{t(`location_${location.category}`)}</span>
                          {location.address && (
                            <>
                              <span>•</span>
                              <span className="truncate">{location.address}</span>
                            </>
                          )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-gray-500 dark:text-gray-400">
                  <Search className="w-8 h-8 mb-2 opacity-50" />
                  <p>{t('noResults')}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;