import { combineReducers } from "redux";
import { userReducer, profileReducer } from "../platform";

export default combineReducers({ userReducer, profileReducer });