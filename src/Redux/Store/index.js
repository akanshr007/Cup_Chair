import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import createRootReducer from "../rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = createRootReducer();
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer,
  composeWithDevTools()
);
const store = configureStore({
  reducer: persistedReducer,
});

export { store };
