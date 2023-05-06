import { configureStore } from '@reduxjs/toolkit';
import mapSlice from './4_GoogleMapsStore/mapSlice';
import markerSlice from './4_GoogleMapsStore/markerSlice';
import reviewTableSlice from './4_GoogleMapsStore/reviewTableSlice';

export const store = configureStore({
	reducer: {mapSlice, markerSlice, reviewTableSlice},
  // middleware: [...middlewares]
})
