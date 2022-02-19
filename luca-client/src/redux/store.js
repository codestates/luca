import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slicer/loginSlice";
import userInfoReducer from "./slicer/userInfoSlice";
import counterSliceRuducer from "./counterslice"

export default configureStore({
  reducer: {
    login: loginReducer,
    userInfo: userInfoReducer,
    counterSlice: counterSliceRuducer
  },
});
