import { combineReducers } from "redux";
import { userReducer, roleReducer, permissionReducer, profileReducer } from "../platform";

export default combineReducers({ userReducer, roleReducer, permissionReducer, profileReducer });
