import { combineReducers } from "redux";
import { userReducer, permissionReducer } from "../platform";

export default combineReducers({ userReducer, permissionReducer });