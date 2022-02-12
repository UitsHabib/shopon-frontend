import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import { UserClientRoutes, Login, Logout, Dashboard, ForgotPassword, ResetPassword, MyProfile, UserForm } from './user';
import { Permissions } from './permission';

export function PlatformRoutes() {
    const { path } = useRouteMatch(); // /platform

    return (
        <Route>
            <UserClientRoutes path={path} />
        </Route>
    );
}

export {
    Login,
    Logout,
    Dashboard,
    ForgotPassword,
    ResetPassword,
    MyProfile,
    UserForm,
    Permissions,
};
