import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootSlice";

export default configureStore({
  reducer: {
    user: rootReducer
  },

});

