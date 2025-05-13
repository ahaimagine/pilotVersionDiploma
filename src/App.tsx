import React, { useState, useEffect, Component } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n';
import Header from './components/UI/Header';
import CampusMap from './components/Map/MapContainer';
import DetailPanel from './components/UI/DetailPanel';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Building } from './types';

// Error Boundary Component
class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }
    return this.props.children;
  }
}

function App() {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [showRoute, setShowRoute] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Geolocation permission granted:', position.coords);
        },
        (error) => {
          console.warn('Geolocation permission denied:', error.message);
        }
      );
    } else {
      console.warn('Geolocation not supported.');
    }
  }, []);

  const handleChangeBuilding = (building: Building) => {
    setSelectedBuilding(building);
    setShowDetails(true);
    setShowRoute(false);
  };

  const handleBuildRoute = (building: Building) => {
    setShowRoute(true);
    setShowDetails(false);
    setSelectedBuilding(building);
  };

  const handleClosePanel = () => {
    setSelectedBuilding(null);
    setShowRoute(false);
    setShowDetails(true);
  };

  return (
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
              <Header onBuildingSelect={setSelectedBuilding} />
              <main className="flex-1 relative">
                <CampusMap
                  onBuildingSelect={handleChangeBuilding}
                  selectedBuilding={selectedBuilding}
                  showRoute={showRoute}
                  changeBuild={handleChangeBuilding}
                />
                {selectedBuilding && showDetails && (
                  <DetailPanel
                    building={selectedBuilding}
                    onClose={handleClosePanel}
                    onBuildRoute={() => handleBuildRoute(selectedBuilding)}
                  />
                )}
              </main>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </I18nextProvider>
    </ErrorBoundary>
  );
}

export default App;