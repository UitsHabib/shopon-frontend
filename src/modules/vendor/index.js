import Home from './shop/components/home.component';
import ShopRegister from './shop/components/register.component';
import ShopLogin from './shop/components/login.component';
import ShopLogout from './shop/components/logout.component';
import ShopDashboard from './shop/components/dashboard/dashboard.component';
import ForgotPassword from './shop/components/forgot-password.component';
import MyShopProfile from './shop/components/my-profile/my-profile.component';
import UpdateMyShopProfile from './shop/components/my-profile/update-my-profile.component';
import shopReducer from './shop/shop.reducer';
import productsReducer  from './products/product.reducer';
import Products from './products/component/products.component';
import * as productActions from './products/product.actions';
import * as shopActions from './shop/shop.actions';

export {
    Home,
    ShopRegister,
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
