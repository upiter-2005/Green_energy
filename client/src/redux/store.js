import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import optionsSlice from "./slices/optionsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    options: optionsSlice,
  },
});
