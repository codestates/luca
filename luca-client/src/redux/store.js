import { configureStore } from "@reduxjs/toolkit";
// import loginReducer from "./slicer/loginSlice";
// import userInfoReducer from "./slicer/userInfoSlice";
import rootReducer from "./rootSlice";

export default configureStore({
  reducer: {
    user: rootReducer
  },

});


{/*//////////////////////////////////////////////////////////////////////

  redux state 쓸때: const (불러올 변수명) = ((state) => {state.user.불려올 변수명}))

  redux reducer 쓸때: dispatch(사용할 reducer 이름( 인자는 선택사항 ))

//////////////////////////////////////////////////////////////////////*/}
