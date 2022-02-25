import { combineReducers } from "redux";
import { userReducer } from "../platform";
import { shopReducer } from "../shop";
import { shopProductsReducer } from "../shop";
export default combineReducers({ userReducer, shopReducer, shopProductsReducer });