import axios from "axios";
// import { PostProps } from "components/Post";
import { AppDispatch } from "redux/store";
import { postStart, postSuccess, postFail, createStart, createSuccess, createFail } from "../Slice/PostSlice";

export const GetAllPosts = async(dispatch: AppDispatch) => {
  dispatch(postStart());
  try {
    const res = await axios.get("/api/posts/all");
    dispatch(postSuccess(res.data));
  } catch (error) {
    dispatch(postFail());
  }
}

export const CreatePostFunc =async (post: any, dispatch: AppDispatch, navigate: (param: string) => void) => {
  dispatch(createStart());
  try {
    const res = await axios.post("/api/posts/create", post);
    dispatch(createSuccess(res.data));
    navigate("/main/home")
  } catch (error) {
    dispatch(createFail());
  }
}