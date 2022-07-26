import axios from "axios";
import { loginStart, loginSuccess, loginFail } from "./authSlice";
import { LoginUser } from "pages/Login/Login";

export const loginUser = async(user?: LoginUser, dispatch?: any, navigate?: any) => {
  dispatch(loginStart);
  try {
    axios.defaults.baseURL = "http://localhost:4000";
    const res = axios.post("/api/auth/signin", user);
    dispatch(loginSuccess((await res).data));
    navigate("/");
  } catch (error) {
    dispatch(loginFail);
  }
}
