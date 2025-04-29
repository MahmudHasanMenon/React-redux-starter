import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import postsReducer from './postsSlice';
import {apiSlice} from './apiSlice';

export const store = configureStore({
    reducer: {
        authReducer: authReducer,
        postsReducer: postsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer, // Important for RTK Query!
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware), // Add RTK Query middleware
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;