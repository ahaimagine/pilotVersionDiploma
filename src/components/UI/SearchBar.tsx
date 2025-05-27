import React, { useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useSearch from '../../hooks/useSearch';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { motion, AnimatePresence } from 'framer-motion';
import { Building } from '../../types';
import { useBuildingsContext } from '@context/BuildingsContext';

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
   const {institutes, departments, buildings}  = useBuildingsContext();
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
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsActive(true)}
          placeholder={t('search')}
          className="w-full h-[48px] p-2.5 pl-10 pr-10 bg-[#F6F6F6] outline-none dark:bg-[#26272C] rounded-lg shadow-sm text-[#5D5D5D] dark:text-[#A3A3A3]"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2D318D] dark:text-[#8287FF]" size={18} />
        
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