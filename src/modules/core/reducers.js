import { combineReducers } from "redux";
import { userReducer, permissionReducer, roleReducer, serviceReducer } from "../platform";
import { shopReducer, productsReducer } from "../shop";
import { customerReducer } from "../customer";

export default combineReducers({
    userReducer, 
    permissionReducer, 
    roleReducer, 
    serviceReducer,
    customerReducer,
    shopReducer,
    productsReducer,
});
