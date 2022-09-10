import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
  name: "post",
  initialState: {
    posts: null,
    post: null,
    isLoading: false,
    isError: false,
  },
  reducers: {
    postStart: state => {
      state.isLoading = true;
      state.isError = false;
    },
    postSuccess: (state, action) => {
      state.posts = action.payload.posts;
      state.isLoading = false;
      state.isError = false;

    },
    postFail: state => {
      state.isLoading = false;
      state.isError = true;
    },
    createStart: state => {
      state.isLoading = true;
      state.isError = false;
    },
    createSuccess: (state, action) => {
      state.post = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    createFail: state => {
      state.isLoading = false;
      state.isError = true;
    },
  }
});

export const {
  postStart,
  postSuccess,
  postFail,
  createStart,
  createSuccess,
  createFail
} = PostSlice.actions;

export default PostSlice.reducer;