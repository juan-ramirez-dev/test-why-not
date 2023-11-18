'use client';

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import userSlice from "./features/userSlice";

const local_state = typeof window !== 'undefined' ?  localStorage.getItem('state') : null
const persistedState = local_state ? JSON.parse(local_state) : {}

export const store = configureStore({
  reducer: {
    authSlice,
    userSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: persistedState
});

store?.subscribe(()=>{
  localStorage?.setItem('state', JSON.stringify(store?.getState()))
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
