import React from 'react';
import UserRoutes from './user.routes';
import Login from './components/login.component';
import Logout from './components/logout.component';
import Dashboard from './components/dashboard/dashboard.component';
import ForgotPassword from './components/forgot-password.component';
import ResetPassword from './components/reset-password.component';
import MyProfile from './components/my-profile/my-profile.component';
import UpdateMyProfile from './components/my-profile/update-my-profile.component';
import UserForm from './components/user-form.component';
import userReducer from './user.reducer';
import * as userActions from './user.actions';

export function UserClientRoutes(props) {
	return <UserRoutes path={props.path} />;
}

export {
	Login,
	Logout,
	Dashboard,
	ForgotPassword,
	ResetPassword,
	MyProfile,
	UpdateMyProfile,
	UserForm,
    userReducer,
	userActions
};
