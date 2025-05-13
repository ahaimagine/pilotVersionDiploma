import React, { useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useSearch from '../../hooks/useSearch';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { motion, AnimatePresence } from 'framer-motion';
import { buildings } from '../../data/buildings';
import { Building } from '../../types';

interface SearchBarProps {
  onBuildingSelect: (building: Building) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onBuildingSelect }) => {
  const { t } = useTranslation();
  const { query, setQuery, results } = useSearch();
  const [isActive, setIsActive] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search results when clicked outside
  useOnClickOutside(searchRef, () => setIsActive(false));

  const handleSelectItem = (itemId: string, type: string) => {
    if (type === 'building') {
      const building = buildings.find(b => b.id === itemId);
      if (building) {
        onBuildingSelect(building);
        setQuery('');
        setIsActive(false);
      }
    } else {
      // For departments and institutes, find their building
      const buildingId = results.find(r => r.id === itemId)?.buildingId;
      if (buildingId) {
        const building = buildings.find(b => b.id === buildingId);
        if (building) {
          onBuildingSelect(building);
          setQuery('');
          setIsActive(false);
        }
      }
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsActive(true)}
          placeholder={t('search')}
          className="w-full p-2.5 pl-10 pr-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:text-white"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
        
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isActive && results.length > 0 && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto"
          >
            <ul>
              {results.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleSelectItem(item.id, item.type)}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center text-gray-900 dark:text-white"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {t(item.type)}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;