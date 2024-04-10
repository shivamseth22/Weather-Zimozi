import React, { useState, useEffect } from 'react';
import { Typography, TextField, Grid, Card, CardContent, Paper } from '@mui/material';



const Forecast = () => {
  const [cityName, setCityName] = useState('delhi');
  const [forecastData, setForecastData] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');

  const fetchForecast = async () => {
    try {
      const apiKey = '253d73606e710cae6490d42d78ec7102';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error('Failed to fetch forecast data');
      }
      const data = await response.json();
      setForecastData(data.list); // Assuming data.list contains forecast data for 5 days
      setSelectedDay(getDayName(new Date(data.list[0].dt_txt)));
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, [cityName]); // Fetch forecast data whenever cityName changes

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const getDayName = (date) => {
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const getUniqueDays = () => {
    const uniqueDays = [];
    forecastData.forEach(item => {
      const day = getDayName(new Date(item.dt_txt));
      if (!uniqueDays.includes(day)) {
        uniqueDays.push(day);
      }
    });
    return uniqueDays;
  };

  const DayCard = ({ dayName, isActive, onClick }) => {
    return (
      <Paper
        elevation={isActive ? 5 : 1}
        style={{
          padding: 20,
          cursor: 'pointer',
          backgroundColor: isActive ? 'rgb(213,166,189)' : 'transparent' // Add backgroundColor style here
        }}
        onClick={onClick}
      >
        <Typography variant="h6" align="center">
          {dayName}
        </Typography>
      </Paper>
    );
  };

  const filterForecastByDay = (day) => {
    return forecastData.filter(item => getDayName(new Date(item.dt_txt)) === day);
  };

  return (
    <div style={{ padding: 20 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Enter City Name"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center" style={{ marginTop: 20 }}>
        <Grid item xs={12} sm={2} >

          {getUniqueDays().map((day, index) => (
            <DayCard
              key={index}
              dayName={day}
              isActive={selectedDay === day}
              onClick={() => handleDayChange(day)}
            />
          ))}
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Card sx={{ backgroundColor: 'rgba(111,93,165 ,0.1)', height: '100%' }}>
            <CardContent>
              {/* <Typography variant="h6" align="center">{selectedDay}</Typography> */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', width: '100%', marginBottom: '10px' }}>
                  <Typography variant="subtitle1">Time</Typography>
                  <Typography variant="subtitle1">Temperature (°C)</Typography>
                  <Typography variant="subtitle1">Humidity (%)</Typography>
                  <Typography variant="subtitle1">Wind Speed (m/s)</Typography>
                  <Typography variant="subtitle1">Weather</Typography>
                </div>
                {filterForecastByDay(selectedDay).map((item, index) => (
                  <div key={index} style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', width: '100%', marginBottom: '5px' }}>
                    <Typography>{new Date(item.dt_txt).toLocaleTimeString()}</Typography>
                    <Typography>{item.main.temp} °C</Typography>
                    <Typography>{item.main.humidity}%</Typography>
                    <Typography>{item.wind.speed} m/s</Typography>
                    <Typography>{item.weather[0].description}</Typography>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Forecast;
