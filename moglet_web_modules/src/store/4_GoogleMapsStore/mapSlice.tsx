import { createSlice } from '@reduxjs/toolkit'

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    km: 1,
    center: {
      lat: 37.5662952,
      lng: 126.9779451
    }
  },
  reducers: {
    setCenter: (state, action) => {
      state.center = action.payload
    },
    setKm: (state, action) => {
      state.km = action.payload
    },
  },
})

export const { setCenter, setKm } = mapSlice.actions; 
export default mapSlice.reducer;