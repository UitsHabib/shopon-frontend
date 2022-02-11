import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import {
    UserClientRoutes,
    Login,
    Logout,
    Dashboard,
    ForgotPassword,
    ResetPassword,
    MyProfile,
    UserForm,
} from './user';
import { Roles } from './role';
import { Permissions } from './permission';
import { RoleClientRoutes } from './role';

export function PlatformRoutes() {
    const { path } = useRouteMatch(); // /platform
    // console.log('In PlatformRoutes', path);
    return (
        <Route>
            <UserClientRoutes path={path} />
            <RoleClientRoutes path={path} />
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
    Roles,
};
