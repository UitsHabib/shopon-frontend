import ShopLogin from './shop/login.component'
import ShopLogout from './shop/logout.component';
import ShopDashboard from './shop/dashboard/dashboard.component';
import ForgotPassword from './shop/forgot-password.component';
import MyShopProfile from './shop/my-profile/my-profile.component';
import UpdateMyShopProfile from './shop/my-profile/update-my-profile.component';
import shopReducer from './shop/shop.reducer';
import productsReducer  from './products/products.reducer';
import Products from './products/products';
import * as productActions from './products/products.actions';
import * as shopActions from './shop/shop.actions';

export {
	ShopLogin,
	ShopLogout,
	ShopDashboard,
	ForgotPassword,
	MyShopProfile,
	UpdateMyShopProfile,
    shopReducer,
    productsReducer,
	shopActions,
    Products,
    productActions,
};
