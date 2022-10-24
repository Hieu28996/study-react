import axios from "axios";
import { PostProps } from "pages/CreatePost/CreatePost";
import { AppDispatch } from "redux/store";
import { postStart, postSuccess, postFail } from "../Slice/PostSlice";

export const GetAllPosts = async(dispatch: AppDispatch) => {
  dispatch(postStart());
  try {
    const res = await axios.get("/api/posts/all");
    dispatch(postSuccess(res.data));
  } catch (error) {
    dispatch(postFail());
  }
}

export const createPostFunc =async (data: PostProps) => {
  if (data !== undefined) {
    const formData = new FormData();

    Object.keys(data).map((item) => {
      if(item !== "image") {        
        formData.append(item, data[item as keyof PostProps]);
      } else {
        data[item].forEach((file: any)=>{
          formData.append("file", file);
        })
      }
    })
    
    const res = await axios({
      method: "post",
      url: "/api/posts/create",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data
  }
}

