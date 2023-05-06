import { createSlice } from '@reduxjs/toolkit'


export const markerSlice = createSlice({
  name: 'marker',
  initialState: {
    markerList: [],
    selectedMarker: null,
  },
  reducers: {
    
  },
})

export const { } = markerSlice.actions; 
export default markerSlice.reducer;