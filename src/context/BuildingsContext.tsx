import React, { createContext, useContext } from 'react';
import useBuildings from '../hooks/useBuildings';
import { Building, Department, Institute } from '@types';

type BuildingsContextType = {
  institutes: Institute[] | null;
  departments: Department[] | null;
  buildings: Building[] | null;
};

const BuildingsContext = createContext<BuildingsContextType | null>(null);

export const BuildingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {institutes, departments, buildings} = useBuildings();

  return (
    <BuildingsContext.Provider value={{ institutes, departments, buildings }}>
      {children}
    </BuildingsContext.Provider>
  );
};

export const useBuildingsContext = () => {
  const context = useContext(BuildingsContext);
  if (!context) {
    throw new Error('useBuildingsContext must be used within a BuildingsProvider');
  }
  return context;
};