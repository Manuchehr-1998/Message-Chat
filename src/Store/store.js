// src/Store/store.js
import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "../Reduser/ChatReduser";

const store = configureStore({
  reducer: {
    chatSlice: chatSlice,
    // other reducers
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
