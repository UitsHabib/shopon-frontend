import React from 'react';
import { Switch, Route } from 'react-router-dom';

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
} from '../platform';

function App() {
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
            <PrivateRoute path="/service-list" component={ServiceList} />
            <Route component={NoMatch} />
        </Switch>
    );
}

export default App;
