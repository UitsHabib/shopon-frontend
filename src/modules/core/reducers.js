import { combineReducers } from "redux";
import { userReducer, permissionReducer, roleReducer, serviceReducer } from "../platform";

export default combineReducers({ userReducer, permissionReducer, roleReducer, serviceReducer });
