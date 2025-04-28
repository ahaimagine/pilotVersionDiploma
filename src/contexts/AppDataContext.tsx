import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { sampleLocations } from '../data/sampleLocations';
import { Location } from '../types';

interface AppDataContextType {
  locations: Location[];
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location | null) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  
  // Load sample locations
  useEffect(() => {
    // In a real app, this would come from an API
    setLocations(sampleLocations);
  }, []);
  
  return (
    <AppDataContext.Provider value={{ 
      locations, 
      selectedLocation, 
      setSelectedLocation 
    }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};