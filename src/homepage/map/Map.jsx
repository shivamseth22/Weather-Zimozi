import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker'; // Create Marker component to show AQI
import { centroids } from './Centroids'; // Import centroids data

const Map = () => {
  const [aqiData, setAqiData] = useState([]);

  useEffect(() => {
    // Example air quality data for each centroid
    const aqiData = centroids.map((centroid, index) => ({
      city: {
        geo: [centroid.Latitude, centroid.Longitude], // Latitude and longitude from centroid
      },
      aqi: Math.floor(Math.random() * 500) + 1, // Example random AQI value (1-500)
    }));

    // Set the data
    setAqiData(aqiData);
  }, []);

  return (
    <Grid container style={{ height: '100vh' }}>
      <Grid item xs={12}>
        <div style={{ height: '100%', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyAgTKEHC_7hdQeAIh27JkGzIBhpOVLKtZs' }} // Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key
            defaultCenter={{ lat: 20.5937, lng: 78.9629 }} // Set default center to India
            defaultZoom={5} // Set default zoom level of the map
          >
            {aqiData.map((cityData, index) => (
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
