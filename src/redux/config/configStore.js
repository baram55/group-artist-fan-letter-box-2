import { configureStore } from "@reduxjs/toolkit";
import letters from "../modules/letters";
import member from "../modules/member";
import auth from "../modules/auth";
const store = configureStore({
  reducer: { letters, member, auth },
});

export default store;
