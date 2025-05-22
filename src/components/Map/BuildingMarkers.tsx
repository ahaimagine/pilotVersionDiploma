import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { Building } from '@types';
import { buildings } from '@data/buildings';

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

interface BuildingMarkersProps {
  onBuildingSelect: (building: Building) => void;
  selectedBuilding: Building | null;
  showRoute: boolean;
  changeBuild: (building: Building) => void;
}

const BuildingMarkers: React.FC<BuildingMarkersProps> = ({
  onBuildingSelect,
  selectedBuilding,
  showRoute,
  changeBuild,
}) => {
  const handleMarkerClick = (building: Building) => {
    if (showRoute) {
      changeBuild(building);
    } else {
      onBuildingSelect(building);
    }
  };

  return (
    <>
      {buildings.map(building => (
        <Marker
          key={building.id}
          position={building.coordinates}
          icon={defaultIcon}
          eventHandlers={{
            click: () => handleMarkerClick(building),
          }}
        />
      ))}
    </>
  );
};

export default BuildingMarkers;