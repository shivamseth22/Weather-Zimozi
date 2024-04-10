import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';

const FavLocation = ({ location }) => {

  const [favoriteCities, setFavoriteCities] = useState([]);
  const [tokenPresent, setTokenPresent] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setTokenPresent(true);
      const storedFavoriteCities = JSON.parse(localStorage.getItem('favoriteCities'));
      if (storedFavoriteCities) {
        setFavoriteCities(storedFavoriteCities);
      }
    }
  }, []);

  if (!tokenPresent) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Please log in to view favorite cities.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (

    <>
      <Grid container  mt={2}>

        {favoriteCities.map((item) => (


          <Card key={item} style={{ width: '100%', backgroundColor: "rgba(111,93,165 ,0.1)", marginBottom: '17px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {item}
              </Typography>
            </CardContent>
          </Card>
        ))}

      </Grid>

    </>

  );
}

export default FavLocation;
