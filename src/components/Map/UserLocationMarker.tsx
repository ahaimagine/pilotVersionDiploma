import React, { useMemo, useEffect } from 'react';
import { Marker, Tooltip, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import useRouting from '../../hooks/useRouting';
import { Building } from '../../types';
import { useTranslation } from 'react-i18next';

interface UserLocationMarkerProps {
  position: LatLngExpression;
  selectedBuilding: Building | null;
}

const UserLocationMarker: React.FC<UserLocationMarkerProps> = ({ position, selectedBuilding }) => {
  const { t } = useTranslation();
  const map = useMap();

  // Custom marker icon for user location
  const userIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
    className: 'user-location-marker',
  });

  // Setup routing if a building is selected
  const startPoint = useMemo(() => {
    const [lat, lng] = Array.isArray(position) ? position : [position.lat, position.lng];
    return L.latLng(lat, lng);
  }, [position]);

  const endPoint = useMemo(() => {
    if (!selectedBuilding) return null;
    return L.latLng(selectedBuilding.coordinates[0], selectedBuilding.coordinates[1]);
  }, [selectedBuilding]);

  useRouting({ startPoint, endPoint });

  // Fallback to hide the leaflet-routing-container
  useEffect(() => {
    if (endPoint) {
      const routingContainer = document.querySelector('.leaflet-routing-container');
      if (routingContainer) {
        routingContainer.style.display = 'none'; // Hide the container
      }
    }

    return () => {
      const routingContainer = document.querySelector('.leaflet-routing-container');
      if (routingContainer) {
        routingContainer.remove();
      }
    };
  }, [endPoint]);

  return (
    <Marker position={position} icon={userIcon}>
      <Tooltip direction="top" offset={[0, -20]} permanent>
        {t('yourLocation')}
      </Tooltip>
    </Marker>
  );
};

export default UserLocationMarker;