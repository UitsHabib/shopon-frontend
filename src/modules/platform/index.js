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

import { PermissionClientRoutes } from './permission';
import { RoleClientRoutes, Roles } from './role';
import { ProfileClientRoutes, Profiles, CreateProfile } from './profile';
import ServicesClientRoutes from './services';

export function PlatformRoutes() {
	const { path } = useRouteMatch(); // /platform
	// console.log('In PlatformRoutes', path);
	return (
		<Route>
			<UserClientRoutes path={path} />
			<RoleClientRoutes path={path} />
			<ProfileClientRoutes path={path} />
			<ServicesClientRoutes path={path} />
            <PermissionClientRoutes path={path} />
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
    Roles,
    Profiles,
    CreateProfile
};
