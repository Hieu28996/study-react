import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "allUser",
  initialState: {
    allUser: null,
      isFetching: false,
      error: false,
  },
  reducers: {
    allUserStart: state => {
      state.isFetching = true;
      state.error = false;
    },
    allUserSuccess: (state, action) => {
      state.allUser = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    allUserFail: state => {
      state.isFetching = true;
      state.error = false;
    },
  }
})

export const {
  allUserStart,
  allUserSuccess,
  allUserFail
} = UserSlice.actions;

export default UserSlice.reducer;
