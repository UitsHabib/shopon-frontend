import React from "react";
import { Switch, Route } from "react-router-dom";

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
	Permissions,
	UpdateMyProfile,
} from '../platform';
import { Customer } from "../customer";
import { Shops } from "../shop";
import { ComplaintDummy } from "../complaint";
import {ToastContainer} from "react-toastify";

function App() {
	return (
		<>
			<ToastContainer/>
			<Switch>
				<PublicRoute path="/login" component={Login} />
				<PrivateRoute path="/logout" component={Logout} />
				<PrivateRoute exact path="/" component={Dashboard} />
				<Route path="/reset-password" component={ResetPassword} />
				<Route path="/forgot-password" component={ForgotPassword} />
				<Route path="/platform" component={PlatformRoutes} />
        <PrivateRoute path="/customer" component={Customer} />
        <PrivateRoute path="/shop" component={Shops} />
        <Route path="/complaint" component={ComplaintDummy} />
				
				<PrivateRoute path="/my-profile" component={MyProfile} />
        <PrivateRoute
                path="/update-my-profile"
                component={UpdateMyProfile}
            />
				<PrivateRoute path="/update-my-profile" component={UpdateMyProfile} />
				<PrivateRoute path="/service-list" component={ServiceList} />
				<Route component={NoMatch} />
			</Switch>
		</>
	);
}

export default App;
