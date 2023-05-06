import { createSlice } from '@reduxjs/toolkit'

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    km: 0,
    center: {
      lat: 37.5662952,
      lng: 126.9779451
    }
  },
  reducers: {

  },
})

export const { } = mapSlice.actions; 
export default mapSlice.reducer;