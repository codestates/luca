import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterslice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
})