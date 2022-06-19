import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notify(state, action) {
      return action.payload;
    },
    reset(state, action) {
      return action.payload;
    },
  },
});
export const { notify, reset } = notificationSlice.actions;
export default notificationSlice.reducer;
