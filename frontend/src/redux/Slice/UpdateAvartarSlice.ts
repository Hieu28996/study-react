import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadAvatarApi } from "redux/APIs/UserApiRequest";
import type {} from 'redux-thunk/extend-redux';
import { getUser } from "./UserSlice";


export interface AvatarState {
  avatarUser?: {avatar: string};
  isLoading?: boolean;
}

export const uploadAvatar = createAsyncThunk("uploadStatus",   async (data: { username: string; avatar: string | Blob; } | undefined) => {
  try {
    if(data) {
      const res = await uploadAvatarApi(data);
      return res
    }
  } catch (err) {
    console.log(err);
  }
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
