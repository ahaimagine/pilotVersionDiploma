import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import SearchBar from './SearchBar';
import BurgerMenu from './BurgerMenu';
import { Building } from '../../../types';

interface HeaderProps {
  onBuildingSelect: (building: Building) => void;
}

const Header: React.FC<HeaderProps> = ({ onBuildingSelect }) => {
  const { t } = useTranslation();

  return (
    <header className="top-0 z-40 bg-transparent fixed w-full">
      <div className="container mx-auto px-4 h-16 flex items-center gap-[24px]">
        
        <div className="flex-1 w-full">
          <SearchBar onBuildingSelect={onBuildingSelect} />
        </div>
        
        <BurgerMenu />
      </div>
    </header>
  );
};

export default Header;