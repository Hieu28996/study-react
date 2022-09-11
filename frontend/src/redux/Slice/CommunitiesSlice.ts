import { createSlice } from "@reduxjs/toolkit";

const CommunitiesSlice = createSlice({
  name: "communities",
  initialState: {
    community: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    userCommunityStart: state => {
      state.isFetching = true;
      state.error = false;
    },
    userCommunitySuccess: (state, action) => {
      state.community = action.payload;
      state.isFetching = true;
      state.error = false;
    },
    userCommunityFail: state => {
      state.isFetching = false;
      state.error = true;
    },
  }
})

export const {
  userCommunityStart,
  userCommunitySuccess,
  userCommunityFail
} = CommunitiesSlice.actions;

export default CommunitiesSlice.reducer;