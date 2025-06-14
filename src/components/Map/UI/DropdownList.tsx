import React, { useState } from 'react';
import { Department, Institute } from '../../../types';
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
    <div className="dark:border-gray-700 py-[12px] hover:bg-[#E9E9E9] cursor-pointer px-[12px] rounded-[12px] dark:hover:bg-[#34353C]">
      <button
        className="flex justify-between items-center w-full text-left font-semibold text-gray-900 dark:text-white"
        onClick={onToggle}
      >
        <span>{title} ({items.length})</span>
        {isActive ? (
          <ChevronUp size={20} className="text-[#2D318D] dark:text-[#8287FF]" />
        ) : (
          <ChevronDown size={20} className="text-[#2D318D] dark:text-[#8287FF]" />
        )}
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-visible "
          >
            <ul className="mt-3 space-y-3">
              {visibleItems.map((item) => (
                <li key={item.id} className="pl-3 border-l-2 border-primary-300 dark:border-primary-700">
                  <div className="flex justify-between font-medium text-gray-900 dark:text-white">
                    <span>{item.name[lang]}</span>
                    <span className="whitespace-nowrap">
                      {item?.location?.[lang] ? (lang === 'uk' ? 'К.' : 'R.') : ''}{item?.location?.[lang] ?? ''}
                    </span>
                  </div>
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