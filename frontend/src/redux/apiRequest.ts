import axios from "axios";
import { loginStart, loginSuccess, loginFail } from "./authSlice";
import { LoginUser } from "pages/Login/Login";
import { AppDispatch } from "redux/store";

export const loginUser = async(user: LoginUser, dispatch: AppDispatch, navigate: (param: string) => void) => {
  dispatch(loginStart);
  try {
    const res = axios.post("/api/auth/signin", user);
    dispatch(loginSuccess((await res).data));
    navigate("/");
  } catch (error) {
    dispatch(loginFail);
  }
}
