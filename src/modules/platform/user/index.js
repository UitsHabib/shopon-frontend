import React  from 'react';
import UserRoutes from './user.routes';
import Login from './components/login.component';
import Logout from './components/logout.component';
import Dashboard from './components/dashboard.component';
import ForgotPassword from './components/forgot-password.component';
import ResetPassword from './components/reset-password.component';
import { MyProfile, UpdateMyProfile } from './components/my-profile';
import UserForm from './components/user-form.component';

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
    UserForm
};