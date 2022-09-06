import { combineReducers } from "@reduxjs/toolkit";
import login from "./Slice/LoginSlice";
import register from "./Slice/RegisterSlice";
import allUser from "./Slice/AllUserSlice";
import posts from "./Slice/PostSlice";

const rootReducer = combineReducers({
  login,
  register,
  allUser,
  posts,
})

export default rootReducer;
