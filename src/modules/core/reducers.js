import { combineReducers } from "redux";
import { userReducer, roleReducer, permissionReducer } from "../platform";

export default combineReducers({ userReducer, roleReducer, permissionReducer });