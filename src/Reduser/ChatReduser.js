// features/newsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const chatSlice = createSlice({
  name: "chatSlice",
  initialState: {
    rooms: [],
    roomID: "",
    loading: false,
    error: null,
  },
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setRoomID: (state, action) => {
      state.roomID = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default chatSlice.reducer;

export const { setLoading, setError, setRoomID, setRooms } = chatSlice.actions;

