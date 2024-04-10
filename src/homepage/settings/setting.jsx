import React from 'react';
import { Grid, Card, CardContent, Box } from '@mui/material';
import Language from './Language';

const Setting = () => {
  return (
    <Grid container spacing={3} display={'flex'} justifyContent={'center'} alignItems={'center'} mt={2}>
      <Grid item xs={12} sm={8} >
        <Card>
          <CardContent>
            Language
            <Box display={"inline-block"} width={"300px"}><Language/></Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Card>
          <CardContent>
            {/* Content of the second card */}
            Card 2
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Setting;
