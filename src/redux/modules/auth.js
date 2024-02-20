import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoggedIn: false };

const authSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    logOut: () => {
      return { isLoggedIn: false };
    },
    logIn: () => {
      return { isLoggedIn: true };
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
