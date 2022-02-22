import React from 'react';
import ShopLogin from './components/login.component';
import ShopLogout from './components/logout.component';
import ShopDashboard from './components/dashboard/dashboard.component';
import ForgotPassword from './components/forgot-password.component';
import MyShopProfile from './components/my-profile/my-profile.component';
import UpdateMyShopProfile from './components/my-profile/update-my-profile.component';
import shopReducer from './shop.reducer';
import * as shopActions from './shop.actions';

export {
	ShopLogin,
	ShopLogout,
	ShopDashboard,
	ForgotPassword,
	MyShopProfile,
	UpdateMyShopProfile,
    shopReducer,
	shopActions
};
