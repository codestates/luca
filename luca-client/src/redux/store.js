import { configureStore } from '@reduxjs/toolkit'
import userReducer from './counterslice.js'

export const store = configureStore({
    reducer: {
        user: userReducer,
        checkLogin: userReducer
    },
})