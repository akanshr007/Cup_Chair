import { createSlice } from "@reduxjs/toolkit";

const gridSlice = createSlice({
  name: "grid",
  initialState: {
    gridSlide: {
        grid : true
    }   
  },
  reducers: {
        setGride: (state, action) => {
            state.gridSlide.grid = action.payload;
          },
          setPurchaseGride: (state, action) => {
            state.gridSlide.grid = action.payload;
          },
          setRelistGride: (state, action) => {
            state.gridSlide.grid = action.payload;
          },
          setSoldGride: (state, action) => {
            state.gridSlide.grid = action.payload;
          },
  },
});

export const {setGride} = gridSlice.actions;

export default gridSlice.reducer;