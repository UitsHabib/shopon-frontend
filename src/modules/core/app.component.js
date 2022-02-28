import axios from 'axios';
import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import join from 'url-join';

import NoMatch from './NoMatch';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import ServiceList from './components/service-list.component';
import { Dashboard, Login, Logout, ForgotPassword, ResetPassword, PlatformRoutes, MyProfile, UpdateMyProfile, userActions } from '../platform';
import { Customer } from '../customer';
import { Shops } from '../shop';
import { Complain } from '../complaint';

const { getSignedInUserProfile } = userActions;

let refCount = 0;

function setLoading(isLoading) {
    if (isLoading) {
        refCount++;
        document.getElementById('loader').style = 'display: block';
    } else if (refCount > 0) {
        refCount--;
        if (refCount > 0) document.getElementById('loader').style = 'display: block';
        else document.getElementById('loader').style = 'display: none';
    }
}

axios.interceptors.request.use(config => {
    setLoading(true);
    return config;
}, error => {
    setLoading(false);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    setLoading(false);
    return response;
}, error => {
    setLoading(false);
    return Promise.reject(error);
});

axios.interceptors.response.use(
    response => response,
    error => {
        const loggedInUser = useSelector(state => state.userReducer.loggedInUser);

        if (error.response && error.response.status === 401 && loggedInUser) window.location = "/login";

        return Promise.reject(error);
    }
);



axios.interceptors.request.use(function(config) {
    const isAbsoluteURLRegex = /^(?:\w+:)\/\//;
    const baseUrl = "http://localhost:5000";

    if ( !isAbsoluteURLRegex.test(config.url) ) {
        config.url = join(baseUrl, config.url);
    }

    config.withCredentials = true;

    return config;
});

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSignedInUserProfile());
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
                <PrivateRoute path="/shop" component={Shops} />
                <PrivateRoute path="/complaint" component={Complain} />

                <PrivateRoute path="/my-profile" component={MyProfile} />
                <PrivateRoute path="/update-my-profile" component={UpdateMyProfile} />
                <PrivateRoute path="/update-my-profile" component={UpdateMyProfile} />
                <PrivateRoute path="/service-list" component={ServiceList} />
                <Route component={NoMatch} />
            </Switch>
        </>
    );
}

export default App;
