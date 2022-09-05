import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
  name: "post",
  initialState: {
    postState: {
      posts: null,
      isLoading: false,
      isError: false,
    }
  },
  reducers: {
    postStart: state => {
      state.postState.isLoading = true;
    },
    postSuccess: (state, action) => {
      state.postState.posts = action.payload;
    },
  }
});

export const {
  postStart,
} = PostSlice.actions;

export default PostSlice.reducer;