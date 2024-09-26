import { createSlice } from "@reduxjs/toolkit";

const photographerSlice = createSlice({
  name: "photographer",
  initialState: {
    photoGraphData: {
      list: [],
      count: 0,
    },
    musicianData: {
      list: [],
      count: 0,
    },
    limit: 12,
    offSet: 1,
    musicianoffSet:1,
  },
  reducers: {
    setPhotographerData: (state, action) => {
      state.photoGraphData = {
        list: action.payload.list,
        count: action.payload.count,
      };
    },
    setOffset: (state, action) => {
      state.offSet = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setMusicianData: (state, action) => {
      state.musicianData = {
        list: action.payload.list,
        count: action.payload.count,
      };
    },
    setMusicianOffset: (state, action) => {
      state.musicianoffSet = action.payload;
    },
  },
});

export const { setPhotographerData, setOffset, setLimit, setMusicianData, setMusicianOffset } =
  photographerSlice.actions;

export default photographerSlice.reducer;
