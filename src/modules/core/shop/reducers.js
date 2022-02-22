import { combineReducers } from "redux";
import { userReducer } from "../platform";
import { shopReducer } from "../shop-new";

export default combineReducers({ userReducer, shopReducer });