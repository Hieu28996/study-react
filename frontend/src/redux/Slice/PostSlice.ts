import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostProps } from "pages/CreatePost/CreatePost";
import { createPostFunc } from "redux/APIs/PostApiRequest";

export const createPost = createAsyncThunk("createPost",   async (data: PostProps) => {
  try {
    if(data) {
      const res = await createPostFunc(data);
      return res
    }
  } catch (err) {
    console.log(err);
  }
});

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
  },
  extraReducers: builder => {
    builder
      .addCase(createPost.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(createPost.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })
  }
});

export const {
  postStart,
  postSuccess,
  postFail,
} = PostSlice.actions;

export default PostSlice.reducer;