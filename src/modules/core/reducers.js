import { combineReducers } from "redux";
import { userReducer } from "../platform";
import { shopReducer } from "../shop";
import { customerReducer } from "../customer";

export default combineReducers({ userReducer, shopReducer, customerReducer });
