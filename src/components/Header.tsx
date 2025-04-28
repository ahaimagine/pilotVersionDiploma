import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Menu, X, Map, Sun, Moon, Languages } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  onSearchClick: () => void;
}

const Header = ({ onSearchClick }: HeaderProps) => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);

  return (
    <header className="relative z-20 bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center">
          <Map className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
          <h1 className="text-lg font-bold">{t('appTitle')}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={onSearchClick}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={t('search')}
          >
            <Search className="w-5 h-5" />
          </button>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={theme === 'dark' ? t('themeLight') : t('themeDark')}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button 
            onClick={() => setIsLanguageSelectorOpen(!isLanguageSelectorOpen)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={t('language')}
          >
            <Languages className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 sm:hidden"
            aria-label={isMenuOpen ? t('close') : t('settings')}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : 'closed'} sm:hidden`}>
        <nav className="py-4">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => {
                  onSearchClick();
                  setIsMenuOpen(false);
                }}
                className="w-full px-6 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Search className="w-5 h-5 inline-block mr-2" />
                {t('search')}
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
                className="w-full px-6 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-5 h-5 inline-block mr-2" />
                    {t('themeLight')}
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5 inline-block mr-2" />
                    {t('themeDark')}
                  </>
                )}
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  setIsLanguageSelectorOpen(!isLanguageSelectorOpen);
                  setIsMenuOpen(false);
                }}
                className="w-full px-6 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Languages className="w-5 h-5 inline-block mr-2" />
                {t('language')}
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      {isLanguageSelectorOpen && (
        <LanguageSelector onClose={() => setIsLanguageSelectorOpen(false)} />
      )}
    </header>
  );
};

export default Header;