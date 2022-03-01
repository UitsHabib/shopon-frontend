import axios from "axios";
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import join from "url-join";
import NoMatch from "./NoMatch";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import ServiceList from "./components/service-list.component";
import {
    Dashboard,
    Login,
    Logout,
    ForgotPassword,
    ResetPassword,
    PlatformRoutes,
    MyProfile,
    UpdateMyProfile,
    userActions,
} from "../platform";
import { Complain } from "../complaint";

import {
    CustomerHome,
    CustomerLogin,
    CustomerSignUp,
    CustomerLogout,
    CustomerProduct,
    CustomerAction,
} from "../customer";
import {
    MyShopProfile,
    Products,
    shopActions,
    ShopDashboard,
    ShopLogin,
    ShopLogout,
    UpdateMyShopProfile,
} from "../shop";
const { getSignedInShopProfile } = shopActions;
const { getSignedInUserProfile } = userActions;
const { getSignedInCustomerProfile } = CustomerAction;

let refCount = 0;

function setLoading(isLoading) {
    if (isLoading) {
        refCount++;
        document.getElementById("loader").style = "display: block";
    } else if (refCount > 0) {
        refCount--;
        if (refCount > 0)
            document.getElementById("loader").style = "display: block";
        else document.getElementById("loader").style = "display: none";
    }
}

axios.interceptors.request.use(
    (config) => {
        setLoading(true);
        return config;
    },
    (error) => {
        setLoading(false);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        setLoading(false);
        return response;
    },
    (error) => {
        setLoading(false);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const loggedInUser = useSelector(
            (state) => state.userReducer.loggedInUser
        );

        if (error.response && error.response.status === 401 && loggedInUser)
            window.location = "/login";

        return Promise.reject(error);
    }
);

axios.interceptors.request.use(function (config) {
    const isAbsoluteURLRegex = /^(?:\w+:)\/\//;
    const baseUrl = "http://localhost:5000";

    if (!isAbsoluteURLRegex.test(config.url)) {
        config.url = join(baseUrl, config.url);
    }

    config.withCredentials = true;

    return config;
});

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSignedInCustomerProfile());
        dispatch(getSignedInUserProfile());
        dispatch(getSignedInShopProfile());
    }, []);

    return (
        <>
            <ToastContainer />
            <Switch>
                <PublicRoute path="/admin/login" component={Login} />
                <PrivateRoute path="/admin/logout" component={Logout} />
                <Route path="/admin/reset-password" component={ResetPassword} />
                <Route path="/admin/forgot-password" component={ForgotPassword} />
                <Route path="/admin/platform" component={PlatformRoutes} />
                <PrivateRoute path="/admin/complaint" component={Complain} />
                <PrivateRoute exact path="/admin" component={Dashboard} />

                <PublicRoute path="/signup" component={CustomerSignUp} />
                <PublicRoute path="/login" component={CustomerLogin} />
                <PublicRoute path="/product/:id" component={CustomerProduct} />
                <Route path="/logout" component={CustomerLogout} />
                <PublicRoute exact path="/" component={CustomerHome} />
                <PrivateRoute path="/my-profile" component={MyProfile} />
                <PrivateRoute path="/update-my-profile" component={UpdateMyProfile} />
                <PrivateRoute path="/update-my-profile" component={UpdateMyProfile} />
                <PrivateRoute path="/service-list" component={ServiceList} />

                <PublicRoute path="/shop-login" component={ShopLogin} />
                <PrivateRoute path="/shop-logout" component={ShopLogout} />
                <PrivateRoute path="/shop-dashboard" component={ShopDashboard} />
                <PrivateRoute path="/my-shop-profile" component={MyShopProfile} />
                <PrivateRoute path="/update-my-shop-profile" component={UpdateMyShopProfile}/>
                <PrivateRoute path="/shop-products" component={Products} />

                <Route component={NoMatch} />
            </Switch>
        </>
    );
}

export default App;
