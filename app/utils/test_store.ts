import configureStore from 'redux-mock-store';

const initialState = {
  authSlice: {
    isLoggedIn: false
  },
  userSlice: {
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
  }
}

const mockStore = configureStore();
export const store = mockStore(initialState)