import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    loginState: {
      currentUser: null,
      isFetching: false,
      error: false,
    }
  },
  reducers: {
    loginStart: state => {
      state.loginState.isFetching = true;
      state.loginState.error = false;
    },
    loginSuccess: (state, action) => {
      state.loginState.currentUser = action.payload;
      state.loginState.isFetching = false;
      state.loginState.error = false;
    },
    loginFail: state => {
      state.loginState.isFetching = false;
      state.loginState.error = true;
    },
  }
})

export const {
  loginStart,
  loginSuccess,
  loginFail,
} = LoginSlice.actions;

export default LoginSlice.reducer;