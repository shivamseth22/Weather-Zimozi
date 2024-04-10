// src/redux/weatherSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    lat: null,
    lon: null,
  },
  reducers: {
    setLatLon: (state, action) => {
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
    },
  },
});

export const { setLatLon } = weatherSlice.actions;

export default weatherSlice.reducer;
