import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import { UserClientRoutes, Login, Logout, Dashboard, ForgotPassword, ResetPassword, MyProfile, UserForm } from './user';
import { Permissions } from './permission';
import { ProfileClientRoutes, Profiles, CreateProfile } from './profile';

export function PlatformRoutes() {
    const { path } = useRouteMatch(); // /platform

    return (
        <Route>
            <UserClientRoutes path={path} />
            <ProfileClientRoutes path={path} />
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
    Profiles,
    CreateProfile
};
