import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
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
} = loginSlice.actions;

export default loginSlice.reducer;