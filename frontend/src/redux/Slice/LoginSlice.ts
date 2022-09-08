import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: state => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    loginFail: state => {
      state.isFetching = false;
      state.error = true;
    },
    logoutStart: state => {
      state.isFetching = true;
      state.error = false;
    },
    logoutSuccess: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
    },
    logoutFail: state => {
      state.isFetching = false;
      state.error = true;
    },
  }
})

export const {
  loginStart,
  loginSuccess,
  loginFail,
  logoutStart,
  logoutSuccess,
  logoutFail,
} = LoginSlice.actions;

export default LoginSlice.reducer;