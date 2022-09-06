import axios from "axios";
import { AppDispatch } from "redux/store";
import { postStart, postSuccess, postFail } from "../Slice/PostSlice";

export const GetAllPosts = async(dispatch: AppDispatch, axiosJWT: any) => {
  dispatch(postStart());
  try {
    const res = await axiosJWT.get("/api/posts/all");
    dispatch(postSuccess(res.data));
  } catch (error) {
    dispatch(postFail());
  }
}