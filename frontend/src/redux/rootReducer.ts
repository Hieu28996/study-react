import { combineReducers } from "@reduxjs/toolkit";
import login from "./Slice/LoginSlice";
import register from "./Slice/RegisterSlice";
import allUser from "./Slice/UserSlice";
import post from "./Slice/PostSlice";
import communities from "./Slice/CommunitiesSlice";

const rootReducer = combineReducers({
  login,
  register,
  allUser,
  post,
  communities
})

export default rootReducer;
