import { combineReducers } from "redux";
import { userReducer, permissionReducer, roleReducer, serviceReducer, profileReducer } from "../platform";
import { shopReducer, productsReducer } from "../shop";
import { customerReducer } from "../customer";

export default combineReducers({
    userReducer, 
    permissionReducer, 
    profileReducer,
    roleReducer, 
    serviceReducer,
    customerReducer,
    shopReducer,
    productsReducer,
});
