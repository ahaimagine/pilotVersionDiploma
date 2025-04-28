import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';

interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  follow: boolean;
}

interface LocationContextType {
  userLocation: UserLocation | null;
  locationEnabled: boolean;
  locationError: string | null;
  requestLocationAccess: () => void;
  stopLocationTracking: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  
  // Clean up geolocation watcher on unmount
  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);
  
  const requestLocationAccess = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setLocationEnabled(false);
      return;
    }
    
    // Clear any previous errors
    setLocationError(null);
    
    // Stop any existing watchers
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }
    
    const id = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          follow: true,
        });
        setLocationEnabled(true);
      },
      (error) => {
        setLocationError(error.message);
        setLocationEnabled(false);
        setUserLocation(null);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000, // 10 seconds
        timeout: 10000 // 10 seconds
      }
    );
    
    setWatchId(id);
  }, [watchId]);
  
  const stopLocationTracking = useCallback(() => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setLocationEnabled(false);
    
    // Keep the last location but don't follow
    if (userLocation) {
      setUserLocation({ ...userLocation, follow: false });
    }
  }, [watchId, userLocation]);
  
  return (
    <LocationContext.Provider value={{
      userLocation,
      locationEnabled,
      locationError,
      requestLocationAccess,
      stopLocationTracking
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};