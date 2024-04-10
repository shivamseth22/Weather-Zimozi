import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker'; // Create Marker component to show AQI

const Map = () => {
  const [aqiData, setAqiData] = useState([]);

  useEffect(() => {
    const fetchAirQualityData = async (latitude, longitude) => {
      const apiUrl = `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=b10b8640288150514efccae0eea2acf2c92a8aae`;

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('Failed to fetch air quality data');
        }

        const data = await response.json();
        if (data.status === 'ok') {
          setAqiData(data.data);
        } else {
          throw new Error('Failed to fetch air quality data: ' + data.message);
        }
      } catch (error) {
        console.error('Error fetching air quality data:', error);
        setAqiData([]); // Set aqiData to an empty array in case of error
      }
    };

    // Example location - New Delhi, India
    fetchAirQualityData(28.6139, 77.2090);

    // Fetch AQI for Shanghai
    const fetchShanghaiAQI = async () => {
      const shanghaiUrl = "http://api.waqi.info/feed/shanghai/?token=ad6933b2-5ab9-4d67-bbb9-f757655fcc6d";

      try {
        const response = await fetch(shanghaiUrl);
        const data = await response.json();

        if (data.status === 'ok') {
          setAqiData(prevData => [...prevData, data.data]);
        } else {
          throw new Error('Failed to fetch Shanghai AQI data: ' + data.message);
        }
      } catch (error) {
        console.error('Error fetching Shanghai AQI data:', error);
      }
    };

    fetchShanghaiAQI();
  }, []);

  return (
    <Grid container style={{ height: '100vh' }}>
      <Grid item xs={12}>
        <div style={{ height: '100%', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyAgTKEHC_7hdQeAIh27JkGzIBhpOVLKtZs' }} // Use provided Google Maps API key
            defaultCenter={{ lat: 28.6139, lng: 77.2090 }} // Set default center to New Delhi, India
            defaultZoom={5} // Set default zoom level of the map
          >
            {Array.isArray(aqiData) && aqiData.map((cityData, index) => (
              <Marker
                key={index}
                lat={cityData.city.geo[0]}
                lng={cityData.city.geo[1]}
                aqi={cityData.aqi}
              />
            ))}
          </GoogleMapReact>

        </div>
      </Grid>
    </Grid>
  );
};

export default Map;
