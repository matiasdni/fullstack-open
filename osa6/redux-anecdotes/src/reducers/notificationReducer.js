import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    notify(state, action) {
      return action.payload;
    },
    reset(state, action) {
      return null;
    },
  },
});

export const { notify, reset } = notificationSlice.actions;

export const setNotification = (content, delay) => {
  return (dispatch) => {
    dispatch(notify(content));
    setTimeout(() => {
      dispatch(reset());
    }, delay * 1000);
  };
};

export default notificationSlice.reducer;
