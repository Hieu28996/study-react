import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserApi } from "redux/APIs/UserApiRequest";

export const getUser = createAsyncThunk("getCurrentUser",   async (data: {username: string}) => {
  try {
    const res = await getUserApi(data);
    return res
  } catch (err) {
    console.log(err);
  }
});

const UserSlice = createSlice({
  name: "allUser",
  initialState: {
    allUser: null,
    currentUser: null,
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
  },
  extraReducers: builder => {
    builder
      .addCase(getUser.pending, state => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isFetching = false;
        state.error = false;
      })
      .addCase(getUser.rejected, state => {
        state.isFetching = false;
        state.error = true;
      })
  }
})

export const {
  allUserStart,
  allUserSuccess,
  allUserFail
} = UserSlice.actions;

export default UserSlice.reducer;
