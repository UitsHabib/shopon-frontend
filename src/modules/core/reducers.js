import { combineReducers } from "redux";

import { shopReducer, productsReducer } from "../shop";
import { userReducer, roleReducer, permissionReducer } from "../platform";
import { customerReducer } from "../customer";

export default combineReducers({
	userReducer,
	roleReducer,
	permissionReducer,
	shopReducer,
	productsReducer,
	customerReducer,
});
