import axios from "axios";
import { registerStart, registerSuccess, registerFail } from "../Slice/RegisterSlice";
import { SignUpUser } from "pages/Register/Register";
import { AppDispatch } from "redux/store";

export const registerUser = async(user: SignUpUser, dispatch: AppDispatch, navigate: (param: string) => void) => {
  dispatch(registerStart());
  try {
    // console.log(user.fileUpload);

    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(user)], {
        type: 'application/json',
      })
    );
    
    formData.append(
      "fileUpload",
      new Blob([user.fileUpload.flies[0]], {
        type: "multipart/form-data",
      })
    );    
    
    const res = await axios.post("/api/auth/signup", formData);    
    dispatch(registerSuccess(res.data));
    navigate("/login");
    
    return res;
  } catch (error) {
    dispatch(registerFail());
  }
}