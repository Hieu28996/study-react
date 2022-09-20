import axios from "axios";
import { loginStart, loginSuccess, loginFail, logoutStart, logoutSuccess, logoutFail } from "../Slice/LoginSlice";
import { LoginUser } from "pages/Login/Login";
import { AppDispatch } from "redux/store";
import { getUser } from "redux/Slice/UserSlice";

export const loginUser = async(user: LoginUser, dispatch: AppDispatch, navigate: (param: string) => void) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/api/auth/signin", user);
    await dispatch(loginSuccess(res.data));
    await dispatch(getUser({ username: user.username }))
    navigate("/main/home");
  } catch (error) {
    dispatch(loginFail());
  }
}

export const logoutUser = async(dispatch: AppDispatch, navigate: (param: string) => void) => {
  dispatch(logoutStart());
  try {
    await axios.post("/api/auth/signout");
    dispatch(logoutSuccess());
    navigate("/");
  } catch (error) {
    dispatch(logoutFail());
  }
}
