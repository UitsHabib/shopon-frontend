import { combineReducers } from "redux";
import { shopReducer, productsReducer } from "../shop";
import { customerReducer } from "../customer";
import {
    userReducer,
    roleReducer,
    permissionReducer,
    profileReducer,
} from "../platform";

export default combineReducers({
    customerReducer,
    userReducer,
    roleReducer,
    permissionReducer,
    shopReducer,
    productsReducer,
    profileReducer,
});
