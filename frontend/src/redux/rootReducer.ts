import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./Slice/LoginSlice";
import registerReducer from "./Slice/RegisterSlice";
import allUserSlice from "./Slice/AllUserSlice";

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  allUser: allUserSlice,
})

export default rootReducer;
