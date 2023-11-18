import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isLoggedIn: boolean;
};

const initialState = {
  isLoggedIn : false,
} as AuthState;

export const Auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LogoutAction: () => initialState,
    LoginAction: (state, action: PayloadAction<AuthState>) => {
      return {
        ...state,
        isLoggedIn : true
      }
    },
  },
});


export const {
  LoginAction,
  LogoutAction,
} = Auth.actions;
export default Auth.reducer;
