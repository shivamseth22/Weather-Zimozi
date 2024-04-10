import React, { useEffect, useState } from 'react';

const useAQIData = (latitude, longitude) => {
  const apiKey = 'ad6933b2-5ab9-4d67-bbb9-f757655fcc6d'; // Your AirVisual API key
  const [aqiData, setAqiData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAQIData = async () => {
      const apiUrl = `https://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${apiKey}`;

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('Failed to fetch air quality data');
        }

        const data = await response.json();
        setAqiData(data);
      } catch (error) {
        console.error('Error fetching air quality data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAQIData();
  }, [latitude, longitude, apiKey]);

  return { aqiData, loading, error };
};

export default useAQIData;
