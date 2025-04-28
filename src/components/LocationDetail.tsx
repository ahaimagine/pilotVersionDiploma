import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Clock, Phone, Globe, Navigation, X } from 'lucide-react';
import { Location } from '../types';
import { useLocation } from '../contexts/LocationContext';

interface LocationDetailProps {
  location: Location;
  onClose: () => void;
}

const LocationDetail = ({ location, onClose }: LocationDetailProps) => {
  const { t } = useTranslation();
  const { requestLocationAccess } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLocationRequested, setIsLocationRequested] = useState(false);
  
  useEffect(() => {
    // Animation timing
    setTimeout(() => {
      setIsOpen(true);
    }, 10);
    
    // Check if location is currently open
    const checkIfOpen = () => {
      if (!location.openHours) return false;
      
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, ...
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTime = currentHours * 60 + currentMinutes;
      
      const daySchedule = location.openHours[day];
      if (!daySchedule || !daySchedule.open) return false;
      
      const [openHours, openMinutes] = daySchedule.from.split(':').map(Number);
      const [closeHours, closeMinutes] = daySchedule.to.split(':').map(Number);
      
      const openTime = openHours * 60 + openMinutes;
      const closeTime = closeHours * 60 + closeMinutes;
      
      return currentTime >= openTime && currentTime < closeTime;
    };
  }, [location]);
  
  const handleNavigateClick = () => {
    setIsLocationRequested(true);
    requestLocationAccess();
  };
  
  const getStatusBadge = () => {
    // Placeholder for now, would need actual opening hours data
    const isOpenNow = false;
    
    return (
      <div className={`
        px-2 py-0.5 rounded-full text-xs font-medium 
        ${isOpenNow 
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }
      `}>
        {isOpenNow ? t('open') : t('closed')}
      </div>
    );
  };
  
  return (
    <div className={`
      fixed bottom-0 left-0 right-0 z-10 
      bg-white dark:bg-gray-800 shadow-lg rounded-t-xl
      transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}
      transition-transform duration-300 ease-in-out
    `}>
      <div className="flex justify-center pt-2 pb-1">
        <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </div>
      
      <div className="px-4 py-3">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-bold">{location.name}</h2>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
          <span className="capitalize">
            {t(`location_${location.category}`)}
          </span>
          {getStatusBadge()}
        </div>
        
        {location.description && (
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
            {location.description}
          </p>
        )}
        
        <div className="mt-3 space-y-2">
          {location.address && (
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 mt-0.5 text-gray-500 dark:text-gray-400" />
              <span>{location.address}</span>
            </div>
          )}
          
          {location.openHours && (
            <div className="flex items-start gap-2 text-sm">
              <Clock className="w-4 h-4 mt-0.5 text-gray-500 dark:text-gray-400" />
              <span>8:00 - 20:00</span>
            </div>
          )}
          
          {location.phone && (
            <div className="flex items-start gap-2 text-sm">
              <Phone className="w-4 h-4 mt-0.5 text-gray-500 dark:text-gray-400" />
              <a 
                href={`tel:${location.phone}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {location.phone}
              </a>
            </div>
          )}
          
          {location.website && (
            <div className="flex items-start gap-2 text-sm">
              <Globe className="w-4 h-4 mt-0.5 text-gray-500 dark:text-gray-400" />
              <a 
                href={location.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {new URL(location.website).hostname}
              </a>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleNavigateClick}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Navigation className="w-4 h-4" />
            {t('buildRoute')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationDetail;