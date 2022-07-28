import { createSlice } from "@reduxjs/toolkit";

const RegisterSlice = createSlice({
  name: "register",
  initialState: {
    register: {
      registerUser: null,
      isFetching: false,
      error: false,
    }
  },
  reducers: {
    registerStart: state => {
      state.register.isFetching = true;
      state.register.error = false;
    },
    registerSuccess: (state, action) => {
      state.register.registerUser = action.payload;
      state.register.isFetching = false;
      state.register.error = false;
    },
    registerFail: state => {
      state.register.isFetching = false;
      state.register.error = true;
    },
  }
})

export const {
  registerStart,
  registerSuccess,
  registerFail,
} = RegisterSlice.actions;

export default RegisterSlice.reducer;