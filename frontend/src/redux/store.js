import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from "./slices/apiSlice";
import plantListSlice from "./slices/plantListSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    plantList: plantListSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);