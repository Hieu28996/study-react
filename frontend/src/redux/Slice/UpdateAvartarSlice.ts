import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadAvatarApi } from "redux/APIs/UserApiRequest";
import type {} from 'redux-thunk/extend-redux';


export interface AvatarState {
  avatarUser?: {avatar: string};
  isLoading?: boolean;
}

export const uploadAvatar = createAsyncThunk("uploadStatus",   async (data: { username: string | Blob; avatar: string | Blob; } | undefined) => {
  const res = await uploadAvatarApi(data);
  console.log(res)
  return res
});

const UpdateAvatarSlice = createSlice({
  name: "avatar",
  initialState: {
    avatarUser: null,
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
        state.avatarUser = action.payload;
      })
      .addCase(uploadAvatar.rejected, state => {
        state.isLoading = false;
      })
  }
})

export default UpdateAvatarSlice.reducer;
