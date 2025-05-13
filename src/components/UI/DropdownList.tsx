import React, { useState } from 'react';
import { Department, Institute } from '../../types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface DropdownListProps {
  title: string;
  items: Department[] | Institute[];
  isActive: boolean;
  onToggle: () => void;
  lang: 'uk' | 'en';
}

const DropdownList: React.FC<DropdownListProps> = ({ 
  title, 
  items, 
  isActive, 
  onToggle,
  lang 
}) => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  const initialItemsCount = 5;

  const visibleItems = showAll ? items : items.slice(0, initialItemsCount);
  const hasMoreItems = items.length > initialItemsCount;

  return (
    <div className="mb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
      <button
        className="flex justify-between items-center w-full text-left font-semibold text-gray-900 dark:text-white"
        onClick={onToggle}
      >
        <span>{title} ({items.length})</span>
        {isActive ? (
          <ChevronUp size={20} className="text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronDown size={20} className="text-gray-600 dark:text-gray-400" />
        )}
      </button>
      
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <ul className="mt-3 space-y-3">
              {visibleItems.map((item) => (
                <li key={item.id} className="pl-3 border-l-2 border-primary-300 dark:border-primary-700">
                  <h4 className="font-medium text-gray-900 dark:text-white">{item.name[lang]}</h4>
                  {'description' in item && item.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description[lang]}</p>
                  )}
                </li>
              ))}
            </ul>
            
            {hasMoreItems && (
              <button
                className="mt-3 text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? t('showLess') : t('showMore')}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownList;