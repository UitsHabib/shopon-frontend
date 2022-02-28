import { combineReducers } from "redux";
import { shopReducer } from "../shop";
import { customerReducer } from "../customer";
import { userReducer, roleReducer, permissionReducer } from "../platform";

export default combineReducers({
    customerReducer,
    userReducer,
    roleReducer,
    permissionReducer,
    shopReducer,
});
