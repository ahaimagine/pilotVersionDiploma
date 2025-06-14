import { useState, useEffect } from 'react';

interface GeolocationState {
  location: { lat: number; lng: number } | null;
  error: string | null;
  loading: boolean;
  permissionPrompt: boolean; // показати повідомлення про дозвіл
}

function useGeolocation(): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    error: null,
    loading: true,
    permissionPrompt: false,
  });

  useEffect(() => {
    let watchId: number;

    // Перевірка доступності геолокації
    if (!navigator.geolocation) {
      setState({
        location: null,
        error: 'Геолокація не підтримується вашим браузером',
        loading: false,
        permissionPrompt: false,
      });
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        error: null,
        loading: false,
        permissionPrompt: false,
      });
    };

    const errorHandler = (error: GeolocationPositionError) => {
      setState({
        location: null,
        error: error.message,
        loading: false,
        permissionPrompt: false,
      });
    };

    const requestLocation = () => {
      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      };

      watchId = navigator.geolocation.watchPosition(
        successHandler,
        errorHandler,
        options
      );
    };

    // Використовуємо Permissions API, якщо є
    if ('permissions' in navigator) {
      navigator.permissions
        .query({ name: 'geolocation' as PermissionName })
        .then((result) => {
          if (result.state === 'granted') {
            setState((prev) => ({ ...prev, permissionPrompt: false }));
            requestLocation();
          } else if (result.state === 'prompt') {
            setState((prev) => ({ ...prev, permissionPrompt: true }));
            requestLocation();
          } else {
            setState({
              location: null,
              error: 'Доступ до геолокації заборонено.',
              loading: false,
              permissionPrompt: false,
            });
          }

          // Додаємо слухач змін дозволу (опціонально)
          result.onchange = () => {
            if (result.state === 'granted') {
              setState((prev) => ({ ...prev, permissionPrompt: false }));
              requestLocation();
            } else if (result.state === 'denied') {
              setState({
                location: null,
                error: 'Користувач заборонив доступ до геолокації.',
                loading: false,
                permissionPrompt: false,
              });
            }
          };
        })
        .catch(() => {
          // fallback, якщо помилка при доступі до Permissions API
          setState((prev) => ({ ...prev, permissionPrompt: true }));
          requestLocation();
        });
    } else {
      // Fallback для старих браузерів
      setState((prev) => ({ ...prev, permissionPrompt: true }));
      requestLocation();
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return state;
}

export default useGeolocation;
