import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';

interface RoutingProps {
  startPoint: L.LatLng | null;
  endPoint: L.LatLng | null;
}

function useRouting({ startPoint, endPoint }: RoutingProps) {
  const map = useMap();
  const [isRouting, setIsRouting] = useState(false);
  const routingControlRef = useRef<L.Routing.Control | null>(null);

  // Очистити маршрут
  const removeRoutingControl = () => {
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
      routingControlRef.current = null;
      setIsRouting(false);
    }
  };

  useEffect(() => {
    if (!map) return;

    if (!startPoint || !endPoint) {
      removeRoutingControl();
      return;
    }

    map.whenReady(() => {
      if (routingControlRef.current) {
        routingControlRef.current.setWaypoints([startPoint, endPoint]);
      } else {
        const control = L.Routing.control({
          waypoints: [startPoint, endPoint],
          routeWhileDragging: true,
          showAlternatives: false,
          fitSelectedRoutes: false, // зум самі робимо
          router: L.Routing.osrmv1({
            serviceUrl: 'https://knowwhereinnulpbackend-production.up.railway.app/proxy/osrm',
            profile: 'foot',
          }),
          lineOptions: {
            styles: [
              { color: '#1E40AF', opacity: 0.8, weight: 6 },
              { color: '#3B82F6', opacity: 0.9, weight: 4 },
            ],
          },
        }).addTo(map);

        control.on('routesfound', (e: any) => {
          const route = e.routes?.[0];
          if (route?.bounds?.isValid?.()) {
            map.fitBounds(route.bounds, { padding: [50, 50] });
          }
        });

        routingControlRef.current = control;
      }

      setIsRouting(true);
    });
  }, [map, startPoint, endPoint]);

  const clearRoute = () => {
    removeRoutingControl();
  };

  return { isRouting, clearRoute };
}

export default useRouting;
