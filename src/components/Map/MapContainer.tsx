import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { Building } from '@types';
import BuildingMarkers from './BuildingMarkers';
import UserLocationMarker from './UserLocationMarker';
import useGeolocation from '@hooks/useGeolocation';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import ZoomToBuilding from './ZoomComponent';
import { useTheme } from '../../context/ThemeContext';

const CAMPUS_CENTER: [number, number] = [49.8353, 24.0147];
const DEFAULT_ZOOM = 17;

interface CampusMapProps {
  onBuildingSelect: (building: Building) => void;
  selectedBuilding: Building | null;
  showRoute: boolean;
  changeBuild: (building: Building) => void;
}

const CampusMap: React.FC<CampusMapProps> = ({
  onBuildingSelect,
  selectedBuilding,
  showRoute,
  changeBuild,
}) => {
  const { location } = useGeolocation();
  const [startPoint, setStartPoint] = useState<[number, number] | null>(null);
  const { theme } = useTheme();
  const tileLayerUrl = theme === 'dark'
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  useEffect(() => {
    if (location) {
      setStartPoint([location.lat, location.lng]);
    }
  }, [location]);

  return (
    <motion.div
      className="h-screen w-full relative z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MapContainer
        center={CAMPUS_CENTER}
        zoom={DEFAULT_ZOOM}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
        id="map"
      >
        <TileLayer
          attribution='Map tiles by CartoDB / OSM'
          url={tileLayerUrl}
        />
        <ZoomToBuilding building={selectedBuilding} />

        <BuildingMarkers
          onBuildingSelect={onBuildingSelect}
          selectedBuilding={selectedBuilding}
          showRoute={showRoute}
          changeBuild={changeBuild}
        />

        {location && (
          <UserLocationMarker
            position={[location.lat, location.lng]}
            selectedBuilding={showRoute ? selectedBuilding : null}
          />
        )}
      </MapContainer>
    </motion.div>
  );
};

export default CampusMap;