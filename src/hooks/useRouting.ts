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

    if (routingControl) {
      map.removeControl(routingControl);
      setRoutingControl(null);
    }

    if (startPoint && endPoint) {
      setIsRouting(true);

      const router = L.Routing.osrmv1({
        serviceUrl: 'https://13.60.40.225:5000/route/v1',
        profile: 'foot'
      });

      const control = L.Routing.control({
        waypoints: [startPoint, endPoint],
        router: router,
        routeWhileDragging: true,
        showAlternatives: false,
        fitSelectedRoutes: true,
        lineOptions: {
          styles: [
            { color: '#1E40AF', opacity: 0.8, weight: 6 },
            { color: '#3B82F6', opacity: 0.9, weight: 4 }
          ],
          extendToWaypoints: true,
          missingRouteTolerance: 0
        },
        altLineOptions: {
          styles: [
            { color: '#1E40AF', opacity: 0.8, weight: 6 },
            { color: '#3B82F6', opacity: 0.9, weight: 4 }
          ],
          extendToWaypoints: true,
          missingRouteTolerance: 0
        }
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
