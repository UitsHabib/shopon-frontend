<<<<<<< HEAD
import React from "react";
import { Switch, Route } from "react-router-dom";
import NoMatch from "./NoMatch";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { Dashboard, Login, Logout, ForgotPassword, ResetPassword, PlatformRoutes, MyProfile } from "../platform";
import Permission from "../../feature/permisions/premission";
=======
import React from 'react';
import { Switch, Route } from 'react-router-dom';
>>>>>>> f9a70b47650531c8de274f3f736d18d098e3f7de

import NoMatch from './NoMatch';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import ServiceList from './components/service-list.component';
import {
	Dashboard,
	Login,
	Logout,
	ForgotPassword,
	ResetPassword,
	PlatformRoutes,
	MyProfile,
	Permissions,
	UpdateMyProfile,
} from '../platform';

function App() {
<<<<<<< HEAD
    return (
        <Switch>
            <PublicRoute path="/login" component={Login} />
            <PrivateRoute path="/logout" component={Logout} />
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/permission" component={Permission} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/platform" component={PlatformRoutes} />
            <PrivateRoute path="/my-profile" component={MyProfile} />
            <Route component={NoMatch} />
        </Switch>
    );
=======
	return (
		<Switch>
			<PublicRoute path="/login" component={Login} />
			<PrivateRoute path="/logout" component={Logout} />
			<PrivateRoute exact path="/" component={Dashboard} />
			<Route path="/reset-password" component={ResetPassword} />
			<Route path="/forgot-password" component={ForgotPassword} />
			<Route path="/platform" component={PlatformRoutes} />
			{/* // TODO :  */}
			{/* <Route path="/role" component={RoleRoutes}/> */}
			<PrivateRoute path="/my-profile" component={MyProfile} />
			<PrivateRoute path="/update-my-profile" component={UpdateMyProfile} />
			<PrivateRoute path="/service-list" component={ServiceList} />
			<Route component={NoMatch} />
		</Switch>
	);
>>>>>>> f9a70b47650531c8de274f3f736d18d098e3f7de
}

export default App;
