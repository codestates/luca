import { createSlice } from "@reduxjs/toolkit";

export const rootSlice = createSlice({
  name: "user",

  initialState: {
    blockData: {},
    cardList: [],
    mindmapTree: {},
    projects: [],
    projectId: 0,
    mindmapHistry: [],
    isLogin: false,
    isBlock: false,
    userInfo: {
      id: "",
      email: "",
      name: "",
      isGuest: "",
      isSocial: "",
      createdAt: "",
      updatedAt: "",
    },
    cardData: null,
    timerTimerOn: false,
    timerSettings: false,
  },

  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setCardList: (state, action) => {
      state.cardList = action.payload;
    },
    setMindmapTree: (state, action) => {
      state.mindmapTree = action.payload;
    },
    setMindmapHistory: (state, action) => {
      state.mindmapHistry = action.payload;
    },
    setProjectId: (state, action) => {
      state.projectId = action.payload;
    },
    setProjectList: (state, action) => {
      state.projects = action.payload;
    },
    setIsBlock: (state, action) => {
      state.isBlock = action.payload;
    },
    updateProjectList: (state, action) => {
      state.projects[action.payload.index].title = action.payload.inputData[0];
      state.projects[action.payload.index].desc = action.payload.inputData[1];
    },
    setBlockData: (state, action) => {
      state.blockData = action.payload;
    },
    setTimerTimeOn: (state, action) => {
      state.timerTimerOn = action.payload;
    },
    setTimerSettings: (state, action) => {
      state.timerSettings = action.payload;
    }
  },
});

export const {
  setIsLogin,
  setUserInfo,
  setProjectList,
  setMindmapHistory,
  updateProjectList,
  setCardList,
  setMindmapTree,
  setBlockData,
  setTimerTimeOn,
  setTimerSettings
} = rootSlice.actions;

export default rootSlice.reducer;
