import { configureStore } from '@reduxjs/toolkit';
import mapSlice from './4_GoogleMapsStore/mapSlice';
import markerSlice from './4_GoogleMapsStore/markerSlice';

export const store = configureStore({
	reducer: {mapSlice, markerSlice},
  // middleware: [...middlewares]
})
