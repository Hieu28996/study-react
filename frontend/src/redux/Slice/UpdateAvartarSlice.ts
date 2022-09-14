import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadAvatarApi } from "redux/APIs/UserApiRequest";
import type {} from 'redux-thunk/extend-redux';


export interface AvatarState {
  avatar?: string;
  isLoading?: boolean;
}

export const uploadAvatar = createAsyncThunk("uploadStatus",   async (data: { username: string | Blob; avatar: string | Blob; } | undefined) => {
  const res = await uploadAvatarApi(data);
  return res.data
});

const UpdateAvatarSlice = createSlice({
  name: "avatar",
  initialState: {
    avatar: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadAvatar.pending, state => {
        state.isLoading = true;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.avatar = action.payload;
      })
      .addCase(uploadAvatar.rejected, state => {
        state.isLoading = false;
      })
  }
})

export default UpdateAvatarSlice.reducer;
