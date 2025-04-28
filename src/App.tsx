import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Map from './components/Map';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocationProvider } from './contexts/LocationContext';
import { AppDataProvider } from './contexts/AppDataContext';
import SearchOverlay from './components/SearchOverlay';

function App() {
  const { t } = useTranslation();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  // Set document title based on current language
  useEffect(() => {
    document.title = t('appTitle');
  }, [t]);

  return (
    <ThemeProvider>
      <LocationProvider>
        <AppDataProvider>
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Header 
              onSearchClick={() => setIsSearchVisible(true)} 
            />
            <main className="flex-1 relative">
              <Map />
              {isSearchVisible && (
                <SearchOverlay onClose={() => setIsSearchVisible(false)} />
              )}
            </main>
          </div>
        </AppDataProvider>
      </LocationProvider>
    </ThemeProvider>
  );
}

export default App;