import { configureStore } from "@reduxjs/toolkit";
import letters from "../modules/letters";
import member from "../modules/member";
const store = configureStore({
  reducer: { letters, member },
});

export default store;
