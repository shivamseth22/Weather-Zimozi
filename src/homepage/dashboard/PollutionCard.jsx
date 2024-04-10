import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CircularProgress , Grid , Box } from '@mui/material';
import { Air, AcUnit, LocalGasStation, Gesture, Whatshot, Cloud, FilterDrama, WbIncandescent } from '@mui/icons-material';

const PollutionCard = () => {
  const [pollutionData, setPollutionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const lat = useSelector(state => state.weather.lat) || 19.0760; // Default latitude for Mumbai
  const lon = useSelector(state => state.weather.lon) || 72.8777; // Default longitude for Mumbai
  


  useEffect(() => {
    const fetchPollutionData = async () => {
      try {
        const apiKey = '253d73606e710cae6490d42d78ec7102';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const data = await response.json();
        setPollutionData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pollution data:', error);
      }
    };

    fetchPollutionData();
  }, []);





  return (
    <div>
      <Card variant="outlined" style={{ width: '100%', height: '100%', marginTop: "15px" }}>
        <CardContent style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography variant='h5'>Air Quality Index: {loading ? <CircularProgress size={20} /> : pollutionData?.list[0]?.main?.aqi}</Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Grid container >
          <Grid item xs={12} sm={6}  sx={{bgcolor:"green" , color:'white' , p:'5px', borderRadius:"5px",my:"2px"}}>0-50 Good</Grid>
          <Grid item xs={12} sm={6} sx={{bgcolor:"yellow" , color:'black' , p:'5px', borderRadius:"5px",my:"2px"}}>50-100 Moderate</Grid>
          <Grid item xs={12} sm={6} sx={{bgcolor:"orange" , color:'black' , p:'5px', borderRadius:"5px",my:"2px"}}>100-150 Sensitive Groups</Grid>
          <Grid item xs={12} sm={6} sx={{bgcolor:"red" , color:'white' , p:'5px', borderRadius:"5px",my:"2px"}}>150-200 Unhealthy</Grid>
          <Grid item xs={12} sm={6} sx={{bgcolor:"purple" , color:'white' , p:'5px', borderRadius:"5px",my:"2px"}}>200-250 Very Unhealthy</Grid>
          <Grid item xs={12} sm={6} sx={{bgcolor:"maroon" , color:'white' , p:'5px', borderRadius:"5px",my:"2px"}}>250-Infinite Hazardous</Grid>
          </Grid>
          </div>

          {['Co', 'Nh3', 'No', 'No2', 'O3', 'PM2.5', 'PM10', 'So2'].map((pollutant, index) => (
            <Card
              key={index}
              variant="outlined"
              style={{
                backgroundColor: 'rgb(236,243,248)',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <CardContent style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant='h6'>{pollutant}</Typography>
                <Typography>{pollutionData?.list[0]?.components[pollutant.toLowerCase()] || "N/A"}</Typography>
                {getPollutantIcon(pollutant)}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

// Function to return the appropriate icon based on the pollutant
const getPollutantIcon = (pollutant) => {
  switch (pollutant) {
    case 'Co':
      return <Air />;
    case 'Nh3':
      return <AcUnit />;
    case 'No':
      return <LocalGasStation />;
    case 'No2':
      return <Gesture />;
    case 'O3':
      return <Whatshot />;
    case 'PM2.5':
      return <Cloud />;
    case 'PM10':
      return <FilterDrama />;
    case 'So2':
      return <WbIncandescent />;
    default:
      return null;
  }
};

export default PollutionCard;
