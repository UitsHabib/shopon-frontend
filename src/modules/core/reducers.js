import { combineReducers } from "redux";
import { userReducer, permissionReducer, roleReducer, serviceReducer } from "../platform";
import { shopReducer, productsReducer } from "../shop";
import { customerReducer } from "../customer";
import { profileReducer } from "../platform";

export default combineReducers({
    userReducer, 
    permissionReducer, 
    roleReducer, 
    serviceReducer,
    customerReducer,
    shopReducer,
    productsReducer,
    profileReducer,
});
