import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import NoMatch from './NoMatch';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import ServiceList from './components/service-list.component';
import { Dashboard, Login, Logout, ForgotPassword, ResetPassword, PlatformRoutes, MyProfile, Permissions, UpdateMyProfile, userActions } from '../platform';
import { Customer } from '../customer';
import { Complain } from '../complaint';
import { MyShopProfile, Products, shopActions, ShopDashboard, ShopLogin, ShopLogout, UpdateMyShopProfile } from '../shop';
const { getSignedInShopProfile } = shopActions;
const { getSignedInUserProfile } = userActions;

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSignedInUserProfile());
        dispatch(getSignedInShopProfile());
    }, []);

    return (
        <>
            <ToastContainer />
            <Switch>
                <PublicRoute path="/login" component={Login} />
                <PrivateRoute path="/logout" component={Logout} />
                <PrivateRoute exact path="/" component={Dashboard} />
                <Route path="/reset-password" component={ResetPassword} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/platform" component={PlatformRoutes} />
                <PrivateRoute path="/customer" component={Customer} />
                <PrivateRoute path="/complaint" component={Complain} />

                <PrivateRoute path="/my-profile" component={MyProfile} />
                <PrivateRoute path="/update-my-profile" component={UpdateMyProfile} />
                <PrivateRoute path="/update-my-profile" component={UpdateMyProfile} />
                <PrivateRoute path="/service-list" component={ServiceList} />


                <PublicRoute path="/shop-login" component={ShopLogin} />
                <PrivateRoute path="/shop-logout" component={ShopLogout} />
                <PrivateRoute path="/shop-dashboard" component={ShopDashboard} />
                <PrivateRoute path="/my-shop-profile" component={MyShopProfile} />
                <PrivateRoute path="/update-my-shop-profile" component={UpdateMyShopProfile} />
                <PrivateRoute path="/shop-products" component={Products} />

                <Route component={NoMatch} />
            </Switch>
        </>
    );
}

export default App;
