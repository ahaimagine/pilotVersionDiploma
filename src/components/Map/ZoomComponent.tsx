import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { Building } from '@types';

interface Props {
    building: Building | null;
}

const ZoomToBuilding: React.FC<Props> = ({ building }) => {
    const map = useMap();

    useEffect(() => {
        if (building && building.latitude && building.longitude) {
            map.flyTo([building.latitude, building.longitude], 18); // або map.setView(..., ...)
        }
    }, [building, map]);

    return null;
};

export default ZoomToBuilding;