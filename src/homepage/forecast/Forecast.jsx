import React, { useState, useEffect } from 'react';
import { Typography, TextField, Grid, Card, CardContent } from '@mui/material';

const Forecast = () => {
  const [cityName, setCityName] = useState('delhi');
  const [forecastData, setForecastData] = useState([]);

  const fetchForecast = async () => {
    try {
      const apiKey = '253d73606e710cae6490d42d78ec7102';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error('Failed to fetch forecast data');
      }
      const data = await response.json();
      setForecastData(data.list); // Assuming data.list contains forecast data for 5 days
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, [cityName]); // Fetch forecast data whenever cityName changes

  const getUniqueDates = () => {
    const uniqueDates = [];
    forecastData.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!uniqueDates.includes(date)) {
        uniqueDates.push(date);
      }
    });
    return uniqueDates;
  };

  return (
    <div>
      <Grid container justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
        <TextField
          sx={{ width: "80%" }}
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          label="Enter City Name"
        />
      </Grid>
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        {getUniqueDates().map((date, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card sx={{ backgroundColor: 'rgba(255, 228, 196, 0.5)', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" align="center">{new Date(date).toDateString()}</Typography>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="subtitle1">Time</Typography>
                    <Typography variant="subtitle1">Temperature (°C)</Typography>
                    <Typography variant="subtitle1">Humidity (%)</Typography>
                    <Typography variant="subtitle1">Wind Speed (m/s)</Typography>
                    <Typography variant="subtitle1">Weather</Typography>
                  </div>
                  {forecastData.filter(item => new Date(item.dt * 1000).toDateString() === date).map((item, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', width: '100%' }}>
                      <div>{new Date(item.dt * 1000).toLocaleTimeString()}</div>
                      <div>{item.main.temp} </div>
                      <div>{item.main.humidity}</div>
                      <div>{item.wind.speed} </div>
                      <div>{item.weather[0].description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Forecast;
