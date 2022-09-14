import { combineReducers } from "@reduxjs/toolkit";
import login from "./Slice/LoginSlice";
import register from "./Slice/RegisterSlice";
import allUser from "./Slice/UserSlice";
import post from "./Slice/PostSlice";
import communities from "./Slice/CommunitiesSlice";
import avatar from "./Slice/UpdateAvartarSlice";

const rootReducer = combineReducers({
  login,
  register,
  allUser,
  post,
  communities,
  avatar,
})

export default rootReducer;
