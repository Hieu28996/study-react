import { combineReducers } from "@reduxjs/toolkit";
import login from "./Slice/LoginSlice";
import register from "./Slice/RegisterSlice";
import allUser from "./Slice/AllUserSlice";

const rootReducer = combineReducers({
  login,
  register,
  allUser,
})

export default rootReducer;
