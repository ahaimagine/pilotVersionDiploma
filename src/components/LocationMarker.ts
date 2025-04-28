import { Icon, Marker, MarkerOptions } from 'leaflet';
import { LocationCategory } from '../types';

interface LocationMarkerOptions extends MarkerOptions {
  category: LocationCategory;
  id: string;
  isHighlighted?: boolean;
}

class LocationMarker extends Marker {
  constructor(latLng: [number, number], options: LocationMarkerOptions) {
    const icon = LocationMarker.getIconForCategory(options.category, options.isHighlighted);
    
    super(latLng, {
      ...options,
      icon,
      riseOnHover: true,
      riseOffset: 250
    });
    
    this.options.alt = options.id;
  }
  
  static getIconForCategory(category: LocationCategory, isHighlighted = false): Icon {
    const iconConfig = {
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
      className: `rounded-lg p-1.5 transition-all duration-300 ${isHighlighted ? 'scale-125' : ''}`
    };
    
    const iconUrl = (() => {
      switch (category) {
        case 'building':
          return 'https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/building-2.svg';
        case 'dormitory':
          return 'https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/home.svg';
        case 'library':
          return 'https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/book-open.svg';
        case 'cafeteria':
          return 'https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/coffee.svg';
        case 'service':
          return 'https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/briefcase.svg';
        default:
          return 'https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/map-pin.svg';
      }
    })();
    
    const colorStyles = (() => {
      const baseStyles = isHighlighted ? 'shadow-lg ring-2' : 'shadow-md';
      
      switch (category) {
        case 'building':
          return `${baseStyles} bg-blue-50 dark:bg-blue-950 ring-blue-500 border-blue-500`;
        case 'dormitory':
          return `${baseStyles} bg-green-50 dark:bg-green-950 ring-green-500 border-green-500`;
        case 'library':
          return `${baseStyles} bg-purple-50 dark:bg-purple-950 ring-purple-500 border-purple-500`;
        case 'cafeteria':
          return `${baseStyles} bg-yellow-50 dark:bg-yellow-950 ring-yellow-500 border-yellow-500`;
        case 'service':
          return `${baseStyles} bg-orange-50 dark:bg-orange-950 ring-orange-500 border-orange-500`;
        default:
          return `${baseStyles} bg-gray-50 dark:bg-gray-950 ring-gray-500 border-gray-500`;
      }
    })();
    
    return new Icon({
      ...iconConfig,
      iconUrl,
      className: `${iconConfig.className} ${colorStyles} border-2`
    });
  }
  
  setHighlighted(highlighted: boolean) {
    const category = (this.options as LocationMarkerOptions).category;
    this.setIcon(LocationMarker.getIconForCategory(category, highlighted));
  }
}

export default LocationMarker;