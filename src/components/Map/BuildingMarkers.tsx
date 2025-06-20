import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { Building } from '@types';
import { useBuildingsContext } from '@context/BuildingsContext';

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
  const { buildings } = useBuildingsContext();

  // Early return if buildings aren't loaded yet
  if (!buildings || buildings.length === 0) return null;

  const handleMarkerClick = (building: Building) => {
    if (showRoute) {
      changeBuild(building);
    } else {
      onBuildingSelect(building);
    }
  };
if (!buildings || buildings.length === 0) return null;

  const filtered_buildings = buildings.filter(build => 
    Array.isArray(build.coordinates) && 
    build.coordinates.length === 2 && 
    typeof build.coordinates[0] === 'number' && 
    typeof build.coordinates[1] === 'number' && 
    !isNaN(build.coordinates[0]) && 
    !isNaN(build.coordinates[1])
  );
  return (
    <>
      {filtered_buildings.map((building) => (
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
