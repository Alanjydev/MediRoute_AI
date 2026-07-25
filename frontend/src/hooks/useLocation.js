import { useState, useEffect } from 'react';

export const useLocation = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        setIsLoading(false);
      },
      (error) => {
        setLocationError("Location permission denied. Please enter your city manually.");
        setIsLoading(false);
      }
    );
  }, []);

  return { coordinates, locationError, isLoading };
};
