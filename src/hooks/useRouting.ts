import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';

interface RoutingProps {
  startPoint: L.LatLng | null;
  endPoint: L.LatLng | null;
}

function useRouting({ startPoint, endPoint }: RoutingProps) {
  const map = useMap();
  const [routingControl, setRoutingControl] = useState<L.Routing.Control | null>(null);
  const [isRouting, setIsRouting] = useState(false);

  useEffect(() => {
    if (!map) return;

    // Clean up previous routing control
    if (routingControl) {
      map.removeControl(routingControl);
      setRoutingControl(null);
    }

    // Create new routing if both points are available
    if (startPoint && endPoint) {
      setIsRouting(true);

      const control = L.Routing.control({
        waypoints: [startPoint, endPoint],
        routeWhileDragging: true,
        showAlternatives: true,
        fitSelectedRoutes: true,
        lineOptions: {
          styles: [
            { color: '#1E40AF', opacity: 0.8, weight: 6 },
            { color: '#3B82F6', opacity: 0.9, weight: 4 },
          ],
        },
        altLineOptions: {
          styles: [
            { color: '#6B7280', opacity: 0.6, weight: 5 },
            { color: '#9CA3AF', opacity: 0.7, weight: 3 },
          ],
        },
        createMarker: function() {
          return null; // Don't create markers for waypoints
        },
      }).addTo(map);

      setRoutingControl(control);
    } else {
      setIsRouting(false);
    }

    return () => {
      if (routingControl) {
        map.removeControl(routingControl);
      }
    };
  }, [map, startPoint, endPoint]);

  const clearRoute = () => {
    if (routingControl) {
      map.removeControl(routingControl);
      setRoutingControl(null);
      setIsRouting(false);
    }
  };

  return { isRouting, clearRoute };
}

export default useRouting;