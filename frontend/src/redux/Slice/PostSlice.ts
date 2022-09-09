import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
  name: "post",
  initialState: {
    postsState: {
      posts: null,
      isLoading: false,
      isError: false,
    }
  },
  reducers: {
    postStart: state => {
      state.postsState.isLoading = true;
      state.postsState.isError = false;
    },
    postSuccess: (state, action) => {
      state.postsState.posts = action.payload;
      state.postsState.isLoading = false;
      state.postsState.isError = false;

    },
    postFail: state => {
      state.postsState.isLoading = false;
      state.postsState.isError = true;
    }
  }
});

export const {
  postStart,
  postSuccess,
  postFail
} = PostSlice.actions;

export default PostSlice.reducer;