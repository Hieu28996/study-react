import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { communitiesTypeApi, controlCommunityApi, getCommunityTypeApi } from "redux/APIs/CommunitiesApiRequest";

export const controlCommunity = createAsyncThunk("controlCommunity",
  async (data: { username: string, community: string}) => {
    const res = await controlCommunityApi(data);
    return res;
  }
);

export const communitiesType = createAsyncThunk("communitiesType",
  async () => {
    const res = await communitiesTypeApi();
    return res
  }
);

export const getCommunityType = createAsyncThunk("getCommunityType",
  async (data: { type: string }) => {
    const res = await getCommunityTypeApi(data);
    return res;
  }
);

const CommunitiesSlice = createSlice({
  name: "communities",
  initialState: {
    community: null,
    communityType: null,
    type: null,
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
      .addCase(communitiesType.fulfilled, (state, action) => {
        state.type = action.payload;
      })
      .addCase(getCommunityType.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getCommunityType.fulfilled, (state, action) => {
        state.communityType = action.payload.communities;
      })
  }
})

export const {
  userCommunityStart,
  userCommunitySuccess,
  userCommunityFail
} = CommunitiesSlice.actions;

export default CommunitiesSlice.reducer;