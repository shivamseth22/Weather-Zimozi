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
      <Grid container justifyContent="center" alignItems="center">
        <TextField
        sx={{width:"80%", mt:"10px"}}
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        {getUniqueDates().map((date, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{new Date(date).toDateString()}</Typography>
                {forecastData.filter(item => new Date(item.dt * 1000).toDateString() === date).map((item, index) => (
                  <div key={index}>
                    <Typography>Time: {new Date(item.dt * 1000).toLocaleTimeString()}</Typography>
                    <Typography>Temperature: {item.main.temp} °C</Typography>
                    <Typography>Humidity: {item.main.humidity}%</Typography>
                    <Typography>Wind Speed: {item.wind.speed} m/s</Typography>
                    <Typography>Weather: {item.weather[0].description}</Typography>
                    <br />
                  </div>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Forecast;
