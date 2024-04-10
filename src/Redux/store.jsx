import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from './drawerSlice';

import weatherReducer from './weatherSlice';

const store = configureStore({
    reducer: {
        drawer: drawerReducer,
        weather: weatherReducer,
    }
});

export default store