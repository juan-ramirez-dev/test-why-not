import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  name : string
  email : string
  password : string
  _id : string
  created_at : string
};

const initialState = {
  name : '',
  email : '',
  password : '',
  _id : '',
  created_at : ''
} as UserState;

export const User = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserAction: (state, action: PayloadAction<UserState>) => {
      return {
        ...state,
        ...action?.payload
      }
    },
  },
});


export const {
  updateUserAction,
} = User.actions;
export default User.reducer;
