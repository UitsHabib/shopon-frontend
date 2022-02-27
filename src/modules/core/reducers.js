import { combineReducers } from "redux";
import { shopReducer, shopProductsReducer } from "../shop";
import { userReducer, roleReducer, permissionReducer } from "../platform";

export default combineReducers({
    userReducer,
    roleReducer,
    permissionReducer,
    shopReducer,
    shopProductsReducer,
});
