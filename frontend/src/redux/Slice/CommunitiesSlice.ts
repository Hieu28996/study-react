import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { controlCommunityApi } from "redux/APIs/CommunitiesApiRequest";

export const controlCommunity = createAsyncThunk("controlCommunity",
  async (data: { username: string, community: string}) => {
    const res = await controlCommunityApi(data);
    return;
  }
)

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
  },
  extraReducers: builder => {
    builder
      .addCase(controlCommunity.pending, state => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(controlCommunity.fulfilled, state => {
        state.isFetching = false;
        state.error = false;
      })
  }
})

export const {
  userCommunityStart,
  userCommunitySuccess,
  userCommunityFail
} = CommunitiesSlice.actions;

export default CommunitiesSlice.reducer;