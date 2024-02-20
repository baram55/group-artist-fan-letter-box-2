import { createSlice } from "@reduxjs/toolkit";

const initialState = { id: "", nickname: "", avatar: "", isLoggedIn: false };

const authSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setNickname: (state, action) => {
      const newNickname = action.payload;
      return { ...state, nickname: newNickname };
    },
    setAccount: (state, action) => {
      const { id, nickname, avatar, isLoggedIn } = action.payload;
      return { ...state, id, nickname, avatar, isLoggedIn };
    },
    logOut: (state, action) => {
      const currentStatus = action.payload;
      return { ...state, isLoggedIn: currentStatus };
    },
  },
});

export const { setNickname, setAccount, logOut } = authSlice.actions;
export default authSlice.reducer;
