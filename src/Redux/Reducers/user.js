import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: {},
    cartCount: 0,
    notificationData: {},
    profile: {},
    loggedin: false,
    photographer: false,
    commisionFee: {},
    transactionFee: {},
    showBackBtn: true,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    setNotificationData: (state, action) => {
      state.notificationData = action.payload;
    },
    addNewNotificationData: (state, action) => {
      state.notificationData.data = [
        ...state.notificationData.data.slice(0, 0),
        action.payload,
        ...state.notificationData.data.slice(0),
      ];
      state.notificationData.count = state.notificationData.count + 1;
    },
    setNotificationCount: (state, action) => {
      state.notificationData.count = action.payload;
    },
    removeToken: (state, action) => {
      state.token = action.payload;
    },
    setUserStatus: (state, action) => {
      state.loggedin = action.payload;
    },
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    setPhotographer: (state, action) => {
      state.photographer = action.payload;
    },

    setCommisionFee: (state, action) => {
      state.commisionFee = action.payload;
    },
    setTransactionFee: (state, action) => {
      state.transactionFee = action.payload;
    },
    setShowBackButton: (state, action) => {
      state.showBackBtn = action.payload;
    },
  },
});

export const {
  setCartCount,
  setToken,
  removeToken,
  setNotificationData,
  setUserStatus,
  setUserProfile,
  setPhotographer,
  addNewNotificationData,
  setCommisionFee,
  setTransactionFee,
  setShowBackButton,
  setNotificationCount,
} = userSlice.actions;

export default userSlice.reducer;
