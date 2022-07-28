import axios from "axios";
import { registerStart, registerSuccess, registerFail } from "../Slice/RegisterSlice";
import { SignUpUser } from "pages/Register/Register";
import { AppDispatch } from "redux/store";

export const registerUser = async(user: SignUpUser, dispatch: AppDispatch, navigate: (param: string) => void) => {
  dispatch(registerStart());
  try {
    const res = await axios.post("/api/auth/signup", user);
    dispatch(registerSuccess(res.data));
    navigate("/login");
  } catch (error) {
    dispatch(registerFail());
  }
}