import { combineReducers } from "@reduxjs/toolkit";
import login from "./Slice/LoginSlice";
import register from "./Slice/RegisterSlice";
import allUser from "./Slice/UserSlice";
import post from "./Slice/PostSlice";

const rootReducer = combineReducers({
  login,
  register,
  allUser,
  post,
})

export default rootReducer;
