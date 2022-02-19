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

export const counterSlice = createSlice({

    name: 'user',

    initialState: {
        projects: [],
        isLogin: "",
        userinfo: null
    },

    reducers: {
        increament: (state) => {
            state.test += 1;
        },
        checkLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        getUserInfo: (state, action) => {
            state.userinfo = action.payload;
        },
        getUserProjects: (state, action) => {
            state.projects = action.payload;
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
export const { increament, checkLogin, getUserInfo, getUserProjects } = counterSlice.actions

export default counterSlice.reducer