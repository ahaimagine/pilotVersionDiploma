import { useEffect, useState } from 'react';
import { Map as LeafletMap, Control, DomUtil, DomEvent, Polyline } from 'leaflet';
import { useTranslation } from 'react-i18next';
import { Navigation, Locate, X } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import { useAppData } from '../contexts/AppDataContext';
import { PolylineType } from '../types';
import 'leaflet-routing-machine';

interface MapControlsProps {
  map: LeafletMap;
  onBuildRoute: (route: PolylineType) => void;
}

const MapControls = ({ map, onBuildRoute }: MapControlsProps) => {
  const { t } = useTranslation();
  const { userLocation, requestLocationAccess } = useLocation();
  const { selectedLocation } = useAppData();
  const [routeBuilt, setRouteBuilt] = useState(false);
  
  // Create custom control for location and routing
  useEffect(() => {
    const controlContainer = DomUtil.create('div', 'leaflet-bar leaflet-control');
    controlContainer.style.margin = '16px';
    
    // Prevent map click events from propagating
    DomEvent.disableClickPropagation(controlContainer);
    
    const controlClass = Control.extend({
      onAdd: function() {
        return controlContainer;
      }
    });
    
    const control = new controlClass({ position: 'bottomright' });
    control.addTo(map);
    
    return () => {
      map.removeControl(control);
    };
  }, [map]);
  
  // Build route when user location and selected location are available
  useEffect(() => {
    if (!userLocation || !selectedLocation || !routeBuilt) return;
    
    const userLatLng = [userLocation.latitude, userLocation.longitude];
    const destinationLatLng = [selectedLocation.latitude, selectedLocation.longitude];
    
    // Create a simple polyline route (in a real app, we'd use routing service)
    const routeLine = new Polyline([userLatLng, destinationLatLng], {
      color: '#3B82F6',
      weight: 5,
      opacity: 0.7,
      lineJoin: 'round'
    });
    
    onBuildRoute(routeLine);
    setRouteBuilt(false);
  }, [userLocation, selectedLocation, routeBuilt, onBuildRoute]);
  
  const handleLocationClick = () => {
    requestLocationAccess();
    
    if (userLocation) {
      map.setView([userLocation.latitude, userLocation.longitude], 18);
    }
  };
  
  const handleRouteClick = () => {
    if (!userLocation) {
      requestLocationAccess();
    }
    
    if (selectedLocation) {
      setRouteBuilt(true);
    }
  };
  
  return (
    <div className="absolute bottom-6 right-4 z-10 flex flex-col gap-3">
      <button
        onClick={handleLocationClick}
        className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label={t('currentLocation')}
      >
        <Locate className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </button>
      
      {selectedLocation && (
        <button
          onClick={handleRouteClick}
          className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors"
          aria-label={t('buildRoute')}
        >
          <Navigation className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default MapControls;