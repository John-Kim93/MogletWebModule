import { createSlice } from '@reduxjs/toolkit'

export const reviewTableSlice = createSlice({
  name: 'map',
  initialState: {
    reviewUid: null,
    reviewTableVisibility: false,
  },
  reducers: {
    setReviewUid: (state, action) => {
      state.reviewUid = action.payload
      state.reviewTableVisibility = true
    },
    hideReviewTable: (state) => {
      state.reviewTableVisibility = false
    }
  },
})

export const { setReviewUid, hideReviewTable } = reviewTableSlice.actions; 
export default reviewTableSlice.reducer;