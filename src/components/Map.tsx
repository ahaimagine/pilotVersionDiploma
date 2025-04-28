import { useEffect, useRef, useState } from 'react';
import { Circle, CircleMarker, LatLng, LeafletMouseEvent, Map as LeafletMap, TileLayer } from 'leaflet';
import { useTheme } from '../contexts/ThemeContext';
import { useLocation } from '../contexts/LocationContext';
import { useAppData } from '../contexts/AppDataContext';
import LocationMarker from './LocationMarker';
import LocationDetail from './LocationDetail';
import MapControls from './MapControls';
import { PolylineType } from '../types';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet.markercluster';

const Map = () => {
  const mapRef = useRef<LeafletMap | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<{ [key: string]: LocationMarker }>({});
  const { theme } = useTheme();
  const { userLocation, locationEnabled } = useLocation();
  const { locations, selectedLocation, setSelectedLocation } = useAppData();
  const [mapReady, setMapReady] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<PolylineType | null>(null);
  const userMarkerRef = useRef<CircleMarker | null>(null);
  const accuracyCircleRef = useRef<Circle | null>(null);
  
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    
    const defaultCenter = new LatLng(49.835, 24.014);
    
    const map = new LeafletMap(mapContainerRef.current, {
      center: defaultCenter,
      zoom: 16,
      minZoom: 14,
      maxZoom: 19,
      zoomControl: false,
      attributionControl: false
    });
    
    const tileLayer = getTileLayer(theme);
    tileLayer.addTo(map);
    
    map.on('click', (e: LeafletMouseEvent) => {
      const clickedOnMarker = e.originalEvent.target?.classList.contains('leaflet-marker-icon');
      if (!clickedOnMarker) {
        setSelectedLocation(null);
        if (currentRoute) {
          map.removeLayer(currentRoute);
          setCurrentRoute(null);
        }
        
        // Reset all markers to non-highlighted state
        Object.values(markersRef.current).forEach(marker => {
          marker.setHighlighted(false);
        });
      }
    });
    
    mapRef.current = map;
    setMapReady(true);
    
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);
  
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;
    
    const map = mapRef.current;
    
    map.eachLayer(layer => {
      if (layer instanceof TileLayer) {
        map.removeLayer(layer);
      }
    });
    
    const tileLayer = getTileLayer(theme);
    tileLayer.addTo(map);
  }, [theme, mapReady]);
  
  useEffect(() => {
    if (!mapRef.current || !mapReady || !locationEnabled || !userLocation) return;
    
    const map = mapRef.current;
    
    if (userMarkerRef.current) {
      map.removeLayer(userMarkerRef.current);
    }
    
    if (accuracyCircleRef.current) {
      map.removeLayer(accuracyCircleRef.current);
    }
    
    if (userLocation.accuracy) {
      const accuracyCircle = new Circle(
        [userLocation.latitude, userLocation.longitude],
        {
          radius: userLocation.accuracy,
          fillColor: '#4285F4',
          fillOpacity: 0.15,
          color: '#4285F4',
          weight: 1
        }
      );
      accuracyCircle.addTo(map);
      accuracyCircleRef.current = accuracyCircle;
    }
    
    const userMarker = new CircleMarker(
      [userLocation.latitude, userLocation.longitude],
      {
        radius: 8,
        fillColor: '#4285F4',
        fillOpacity: 1,
        color: '#FFFFFF',
        weight: 2,
        className: 'animate-pulse'
      }
    );
    userMarker.addTo(map);
    userMarkerRef.current = userMarker;
    
    if (userLocation.follow) {
      map.setView([userLocation.latitude, userLocation.longitude], 18);
    }
  }, [userLocation, locationEnabled, mapReady]);
  
  useEffect(() => {
    if (!mapRef.current || !mapReady || !locations.length) return;
    
    const map = mapRef.current;
    
    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => {
      map.removeLayer(marker);
    });
    markersRef.current = {};
    
    locations.forEach(location => {
      const locationMarker = new LocationMarker(
        [location.latitude, location.longitude],
        {
          category: location.category,
          id: location.id,
          isHighlighted: selectedLocation?.id === location.id
        }
      );
      
      locationMarker.on('click', () => {
        // Reset all markers to non-highlighted state
        Object.values(markersRef.current).forEach(marker => {
          marker.setHighlighted(false);
        });
        
        // Highlight clicked marker
        locationMarker.setHighlighted(true);
        
        setSelectedLocation(location);
        map.setView([location.latitude, location.longitude], 18);
      });
      
      locationMarker.addTo(map);
      markersRef.current[location.id] = locationMarker;
    });
  }, [locations, mapReady, selectedLocation]);
  
  const getTileLayer = (currentTheme: string) => {
    if (currentTheme === 'dark') {
      return new TileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      });
    } else {
      return new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      });
    }
  };
  
  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="absolute inset-0 z-0 map-container" />
      
      {mapReady && (
        <MapControls 
          map={mapRef.current!} 
          onBuildRoute={(route) => {
            if (currentRoute) {
              mapRef.current?.removeLayer(currentRoute);
            }
            route.addTo(mapRef.current!);
            setCurrentRoute(route);
          }}
        />
      )}
      
      {selectedLocation && (
        <LocationDetail 
          location={selectedLocation} 
          onClose={() => {
            setSelectedLocation(null);
            // Reset marker highlight
            if (markersRef.current[selectedLocation.id]) {
              markersRef.current[selectedLocation.id].setHighlighted(false);
            }
          }} 
        />
      )}
    </div>
  );
};

export default Map;