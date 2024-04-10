import React from 'react'
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import WeatherCard from "./WeatherCard"
import PollutionCard from './PollutionCard';

const dashboard = () => {

  return (
    <Grid container spacing={2}  >
      <Grid item xs={12} md={8}>
        <WeatherCard />
      </Grid>

      <Grid item xs={12} md={4}>
        <PollutionCard />
      </Grid>

    </Grid>
  )
}

export default dashboard