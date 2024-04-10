import React, { useState, useEffect } from 'react';
import { Card, CardContent, TextField, Grid, IconButton, InputAdornment, Box, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import GrainIcon from '@mui/icons-material/Grain';
import WavesIcon from '@mui/icons-material/Waves';
import OpacityIcon from '@mui/icons-material/Opacity';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { app, auth, firestore } from '../../utils/firebase';
import { useNavigate } from "react-router-dom"
import autumn from '../../assets/autumn.png'
import temperature from '../../assets/temperature.png'
import pressure from '../../assets/pressure.png'
import windSpeed from '../../assets/windSpeed.png'

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Mumbai');
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const [favoriteCities, setFavoriteCities] = useState(() => {
    const storedFavoriteCities = JSON.parse(localStorage.getItem('favoriteCities'));
    return storedFavoriteCities || [];
  });
  console.log(favoriteCities)

  useEffect(() => {
    const storedFavoriteCities = JSON.parse(localStorage.getItem('favoriteCities'));
    console.log(storedFavoriteCities)
    if (storedFavoriteCities) {
      setFavoriteCities(storedFavoriteCities);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
  }, [favoriteCities]);

  const toggleFavorite = () => {
    const token = localStorage.getItem('token');
    if (token) {
      if (!favoriteCities.includes(city)) {
        setIsFavorite(true);
        setFavoriteCities(prevCities => {
          const newCities = [...prevCities, city];
          localStorage.setItem('favoriteCities', JSON.stringify(newCities)); // Update local storage here
          return newCities;
        });
      } else {
        alert('This city is already in your favorites!');
      }
    } else {
      const confirmed = window.confirm('Login to set Favorite City');
      if (confirmed) {
        navigate('/login');
      } else {
        console.log('User cancelled.');
      }
    }
  };



  useEffect(() => {
    // Store favorite cities in localStorage
    localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
  }, [favoriteCities]);

  // Function to update favorite city in Firestore
  //  const updateFavoriteCity = async (city) => {
  //   try {
  //     // Set or update favorite city in Firestore
  //     await db.collection('users').doc('user_id').set({
  //       favoriteCity: city
  //     });
  //   } catch (error) {
  //     console.error('Error updating favorite city:', error);
  //   }
  // };


  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=253d73606e710cae6490d42d78ec7102`);
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          console.error('Failed to fetch weather data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [city]);

  function formatTime(timestamp) {
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const formattedTime = hours % 12 + ':' + minutes.substr(-2) + ' ' + (hours >= 12 ? 'PM' : 'AM');
    return formattedTime;
  }
  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  const temperatureInKelvin = weatherData?.main?.temp;
  const temperatureInCelsius = kelvinToCelsius(temperatureInKelvin);

  return (
    <Grid container >
      <Grid container spacing={2} >
        <Grid item xs={12} sm={3} >
          <Button variant="contained" color={isFavorite ? "secondary" : "secondary"} sx={{ height: "54px", mt: "16px", width: "100%", mb: "-12px" }} onClick={toggleFavorite}>
            {isFavorite ? "Add to Favorites" : "Add to Favorites"}
          </Button>
        </Grid>
        <Grid item xs={12} sm={9} >
          <TextField
            placeholder="Search"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => fetchWeatherData()}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>

      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {weatherData && (
            <Card variant="outlined" sx={{ backgroundColor: "rgba(111,93,165 ,0.1)" }}>
              <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Box display={'flex'} justifyContent={"space-around"} gap={10} sx={{ marginBottom: 3, marginTop: 5 }}>
                  <Typography variant='h5'>{city}</Typography>
                  <Box display="flex" alignItems="center">
                    <WbSunnyIcon />
                    <Typography variant='h5'>{formatTime(weatherData.sys.sunrise)}</Typography>

                  </Box>
                  <Box display="flex" alignItems="center">
                    <NightsStayIcon />
                    <Typography variant='h5'>{formatTime(weatherData.sys.sunset)}</Typography>

                  </Box>
                </Box>
                <Grid item sx={{ textAlign: "center" }}>
                  <Typography variant='h2' sx={{ marginBottom: 2 }}>{temperatureInCelsius.toFixed(2)}°C</Typography>
                  <Typography variant='h6' sx={{ marginBottom: 4 }}>{weatherData.weather[0].description}</Typography>
                </Grid>
                <Grid item display={"flex"} justifyContent="center" gap={10}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}><ThermostatIcon /> Max Temp</Typography>
                    <Typography variant='body2'>{weatherData?.main.temp_max}</Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}><ThermostatIcon /> Min Temp</Typography>
                    <Typography variant='body2'>{weatherData.main.temp_min}</Typography>
                  </Box>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card variant="outlined" sx={{ backgroundColor: "rgb(236,243,248)", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <CardContent>
              <h2 className="info-title" style={{ display: 'flex', flexWrap: 'nowrap' }}><WavesIcon /> Wind</h2>
              <p className="info-description">Today's Wind Speed</p>
              <h3 className="info-value">{weatherData?.wind?.speed} km/h</h3>
            </CardContent>
            <CardContent>

              <Box >

                <img src={windSpeed} alt="" style={{ width: '100px' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" sx={{ backgroundColor: "rgb(236,243,248)", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
            <CardContent>
              <h2 className="info-title" style={{ display: 'flex', flexWrap: 'nowrap' }}> <OpacityIcon /> Humidity</h2>
              <p className="info-description">Today's Humidity</p>
              <h3 className="info-value"> {weatherData?.main?.humidity}</h3>
            </CardContent>
            <CardContent>

              <Box >

                <img src={autumn} alt="" style={{ width: '100px' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" sx={{ backgroundColor: "rgb(236,243,248)", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <CardContent>
              <h2 className="info-title" style={{ display: 'flex', flexWrap: 'nowrap' }}><GrainIcon /> Pressure</h2>
              <p className="info-description">Today's Pressure</p>
              <h3 className="info-value"> {weatherData?.main?.pressure}</h3>
            </CardContent>
            <CardContent>

              <Box >

                <img src={pressure} alt="" style={{ width: '100px' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" sx={{ backgroundColor: "rgb(236,243,248)", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <CardContent>
              <h2 className="info-title" style={{ display: 'flex', flexWrap: 'nowrap' }}><ThermostatIcon /> Temperature </h2>
              <p className="info-description">Today's Temperature</p>
              <h3 className="info-value"> {weatherData?.main?.temp} K</h3>
            </CardContent>
            <CardContent>

              <Box >

                <img src={temperature} alt="" style={{ width: '100px' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WeatherCard;
