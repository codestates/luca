import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slicer/loginSlice";
import userInfoReducer from "./slicer/userInfoSlice";

export default configureStore({
  reducer: {
    login: loginReducer,
    userInfo: userInfoReducer,
  },
});
