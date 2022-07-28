import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./Slice/LoginSlice";
import registerReducer from "./Slice/RegisterSlice";

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer
})

export default rootReducer;