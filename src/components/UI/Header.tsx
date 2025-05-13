import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import SearchBar from './SearchBar';
import BurgerMenu from './BurgerMenu';
import { Building } from '../../types';

interface HeaderProps {
  onBuildingSelect: (building: Building) => void;
}

const Header: React.FC<HeaderProps> = ({ onBuildingSelect }) => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <MapPin className="text-primary-600 dark:text-primary-400 mr-2" size={24} />
          <h1 className="text-lg font-bold text-gray-900 dark:text-white !hidden sm:!block">
  {t('appName')}
</h1>
        </div>
        
        <div className="flex-1 max-w-lg mx-auto px-4">
          <SearchBar onBuildingSelect={onBuildingSelect} />
        </div>
        
        <BurgerMenu />
      </div>
    </header>
  );
};

export default Header;