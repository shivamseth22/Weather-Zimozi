import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const FavLocation = ({ location }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {location.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {location.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FavLocation;
