import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Role {
  _id: string;
  name: string;
  slug: string;
  can_managment_tournaments: boolean;
  can_managment_users: boolean;
  can_participate_tournaments: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserState {
  name: string;
  email: string;
  password?: string;
  _id?: string;
  role_id ? : Role;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}


const initialState = {
  name: "",
  email: "",
  password: "",
  _id: "",
  created_at: "", 
  role_id: {
    _id: "",
    name: "",
    slug: "",
    can_managment_tournaments: false,
    can_managment_users: false,
    can_participate_tournaments: false,
    createdAt: "",
    updatedAt: "",
    __v: 0
  },
  createdAt: "",
  updatedAt: "",
  __v: 0
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
    clearUserAction : () => initialState
  },
});


export const {
  updateUserAction,
  clearUserAction
} = User.actions;
export default User.reducer;
