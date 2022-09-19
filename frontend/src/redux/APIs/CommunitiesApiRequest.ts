import axios from "axios";
import { AppDispatch } from "redux/store";
import { userCommunityStart, userCommunitySuccess, userCommunityFail } from "../Slice/CommunitiesSlice";

export const joinCommunity = async (userCommunity: any, dispatch: AppDispatch) => {
  dispatch(userCommunityStart());
  try {
    const res = await axios.get("/api/community/user", userCommunity);
    dispatch(userCommunitySuccess(res.data));
  } catch (error) {
    dispatch(userCommunityFail());
  }
}

export const controlCommunityApi = async (data: { username: string, community: string }) => {
  const res = await axios.patch("/api/community/control", data);
  return;
} 
