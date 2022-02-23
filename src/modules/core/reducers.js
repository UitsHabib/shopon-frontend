import { combineReducers } from "redux";
import { userReducer } from "../platform";
import { shopReducer } from "../shop";

export default combineReducers({ userReducer, shopReducer });