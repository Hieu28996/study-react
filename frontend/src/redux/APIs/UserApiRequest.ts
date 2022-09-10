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