import { createSlice } from "@reduxjs/toolkit";

const AllUserSlice = createSlice({
  name: "allUser",
  initialState: {
    allUserState: {
      allUser: null,
      isFetching: false,
      error: false,
    }
  },
  reducers: {
    allUserStart: state => {
      state.allUserState.isFetching = true;
      state.allUserState.error = false;
    },
    allUserSuccess: (state, action) => {
      state.allUserState.allUser = action.payload;
      state.allUserState.isFetching = false;
      state.allUserState.error = false;
    },
    allUserFail: state => {
      state.allUserState.isFetching = true;
      state.allUserState.error = false;
    },
  }
})

export const {
  allUserStart,
  allUserSuccess,
  allUserFail
} = AllUserSlice.actions;

export default AllUserSlice.reducer;
