import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// export const checkLogin = createAsyncThunk('user/signin', async (reqData) => {
//     const data =
//     await axios.post('http://localhost:4000/user/login', reqData) //singin 아니라 login임
//     .then((res) =>{
//         // console.log(res)
//         return res.data.message
//     })
//     .catch((err) => {
//         // console.log(err.response.data.message)
//         return err.response.data.message
//     })
//     // console.log(data)
//     return data;
// });

export const rootSlice = createSlice({

    name: 'user',

    initialState: {
        curProjectId: 0,
        cardList: [],
        projects: [],
        isLogin: false,
        userInfo: {
            id: "",
            email: "",
            name: "",
            isGuest: "",
            isSocial: "",
            createdAt: "",
            updatedAt: ""
        }
    },

    reducers: {
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        setProjectList: (state, action) => {
            // console.log(action.payload)
            state.projects = action.payload;
        },
        updateProjectList: (state, action) => {
            state.projects[action.payload.index].title = action.payload.inputData[0];
            state.projects[action.payload.index].desc = action.payload.inputData[1];
        },
        setCurProjectId: (state, action) => {
            state.curProjectId = action.payload;
        },
        setCardList: (state, action) => {
            state.cardList = action.payload;
        }
    },

    // extraRefucers: (builder) => {
    //     builder
    //     .addCase(checkLogin.fulfilled, (state, action) => {
    //         console.log(state.isLogin)
    //         console.log(action.payload)
    //         state.isLogin.push(action.payload)
    //     })
    //     .addCase(checkLogin.rejected, (state, {payload}) => {
    //         console.log(state.isLogin)
    //         console.log(payload)
    //         state.isLogin.push(payload);
    //     });
    // }
});

// Action creators are generated for each case reducer function
export const { 
    setIsLogin, 
    setUserInfo, 
    setProjectList, 
    updateProjectList, 
    setCurProjectId, 
    setCardList 
} = rootSlice.actions

export default rootSlice.reducer