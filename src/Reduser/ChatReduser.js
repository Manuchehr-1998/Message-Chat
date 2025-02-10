// features/newsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chatSlice",
  initialState: {
    rooms: [],
    roomID: "",
    loading: false,
    error: null,
    isBooked: [],
    showMessages: false,
    connectionStatus: "Disconnected",
    profileSidebarOpen: false,
  },
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setShowMessages: (state, action) => {
      console.log("redux", (state.showMessages = action.payload));

      state.showMessages = action.payload;
    },
    setConnectionStatus: (state, action) => {
      state.connectionStatus = action.payload;
    },
    setProfileSidebarOpen: (state, action) => {
      state.profileSidebarOpen = action.payload;
    },
    setRoomID: (state, action) => {
      state.roomID = action.payload;
    },
    setBoocking: (state, action) => {
      // console.log("redux", (state.isBooked = action.payload));

      state.isBooked = action.payload;
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

export const {
  setLoading,
  setError,
  setRoomID,
  setRooms,
  setBoocking,
  setShowMessages,
  setConnectionStatus,
  setProfileSidebarOpen,
} = chatSlice.actions;
