import { combineReducers } from "redux";
import { userReducer, permissionReducer, roleReducer } from "../platform";

export default combineReducers({ userReducer, permissionReducer, roleReducer });
