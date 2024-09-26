import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "user",
  initialState: {
    filter: {
      categoryId: 0,
      location: "",
      priceFrom: "",
      priceTo: "",
      title: "",
      type: "",
      dateFrom: "",
      dateTo: "",
      fulladdress: "",
    },
    filteredNfts: {
      list: [],
      count: 0,
      loader: false,
    },
    filteredCollections: {
      list: [],
      count: 0,
    },
    googleLocation: {},
    searchCounts: {
      collectionCount: null,
      imageCount: null,
      videoCount: null,
      photographerCount: null,
      musiciansCount: null
    }
  },
  reducers: {
    setFilterData: (state, action) => {
      let key = Object.keys(action.payload);
      let value = Object.values(action.payload);
      state.filter = { ...state.filter, [key]: value[0] };
    },

    setFilterDataEmpty: (state) => {
      state.filter = {
        ...state.filter,
        categoryId: 0,
        location: "",
        priceFrom: "",
        priceTo: "",
        title: "",
        dateFrom: "",
        dateTo: "",
        fulladdress: "",
      };
    },
    setFilteredNfts: (state, action) => {
      state.filteredNfts = action.payload;
    },
    setFilteredCollections: (state, action) => {
      state.filteredCollections = action.payload;
    },
    setGoogleLocation: (state, action) => {
      state.googleLocation = action.payload;
    },
    // SEARCH COUNT 
    setSearchCount: (state, action) => {
      const { collectionCount, imageCount, videoCount, photographerCount, musiciansCount } = action.payload;
      state.searchCounts = {
        ...state.searchCounts,
        collectionCount,
        imageCount,
        videoCount,
        photographerCount,
        musiciansCount,
      };
    },
    
  },
});

export const {
  setFilterData,
  setFilterDataEmpty,
  setFilteredNfts,
  setFilteredCollections,
  setGoogleLocation,
  setSearchCount
} = filterSlice.actions;

export default filterSlice.reducer;
