import React, { useMemo, useEffect } from 'react';
import { Marker, Tooltip, useMap } from 'react-leaflet';
import { Icon, latLng, LatLng, LatLngExpression } from 'leaflet';
import useRouting from '@hooks/useRouting';
import { Building } from '@types';
import { useTranslation } from 'react-i18next';

interface UserLocationMarkerProps {
  position: LatLngExpression;
  selectedBuilding: Building | null;
}

const UserLocationMarker: React.FC<UserLocationMarkerProps> = ({
  position,
  selectedBuilding,
}) => {
  const { t } = useTranslation();
  const map = useMap();

  // Custom marker icon for user location
  const userIcon = useMemo(() => new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
    className: 'user-location-marker',
  }), []);

  // Use the `latLng` factory instead of the global `L`
  const startPoint = useMemo<LatLng>(() => {
    const [lat, lng] = Array.isArray(position)
      ? position
      : [position.lat, position.lng];
    return latLng(lat, lng);
  }, [position]);

  const endPoint = useMemo<LatLng | null>(() => {
    if (!selectedBuilding) return null;
    const [lat, lng] = selectedBuilding.coordinates;
    return latLng(lat, lng);
  }, [selectedBuilding]);

  useRouting({ startPoint, endPoint });

  // Hide or remove the routing container—cast to HTMLElement so `.style` exists
  useEffect(() => {
    const container = document.querySelector(
      '.leaflet-routing-container'
    ) as HTMLElement | null;

    if (container) {
      // hide
      container.style.display = endPoint ? 'none' : '';
    }

    return () => {
      if (container) {
        container.remove();
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
