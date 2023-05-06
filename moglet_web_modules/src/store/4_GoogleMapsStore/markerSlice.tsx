import { createSlice } from '@reduxjs/toolkit'


export const markerSlice = createSlice({
  name: 'marker',
  initialState: {
    markerList: [],
    markerInfo: null,
    buttonSelector: "ddo",
    buttonVisibility: true,
  },
  reducers: {
    closeMarkerInfo: state => {
      state.markerInfo = null
    },
    showMarkerInfo: (state, action) => {
      state.markerInfo = action.payload
    },
    addMarkerList: (state, action) => {
      state.markerList = state.markerList.concat(action.payload)
    },
    resetMarkerList: (state) => {
      state.markerList = []
    },
    ddoToDuBtn: state => {
      state.buttonSelector = "du"
    },
    duToDdoBtn: state => {
      state.buttonSelector = "ddo"
    },
    hideButton: state => {
      state.buttonVisibility = false
    },
    showButton: state => {
      state.buttonVisibility = true
    },
  },
})

export const { closeMarkerInfo, addMarkerList, resetMarkerList, showMarkerInfo,
  ddoToDuBtn, duToDdoBtn, hideButton, showButton } = markerSlice.actions; 
export default markerSlice.reducer;