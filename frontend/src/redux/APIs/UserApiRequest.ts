import axios from "axios";
import { allUserFail, allUserStart, allUserSuccess } from "redux/Slice/UserSlice";
import { AppDispatch } from "redux/store";

export const getAllUser = async (dispatch: AppDispatch) => {
  dispatch(allUserStart());
  try {
    const res = await axios.get("/api/users/all");
    dispatch(allUserSuccess(res.data));
    return;
  } catch (error) {
    dispatch(allUserFail());
    return;
  }
}

export const getUserApi = async (data: {username: string}) => {
  const res = await axios.post("/api/users/user", data);
  return res.data
}

export const uploadAvatarApi = async (data: { username: string, avatar:string | Blob } | undefined): Promise<any> => {
  if (data !== undefined) {
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("file", data.avatar);
    const res = await axios({
      method: "post",
      url: "/api/users/upload",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data
  }
}