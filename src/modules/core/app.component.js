import React from "react";
import { Switch, Route } from "react-router-dom";
import NoMatch from "./NoMatch";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { Dashboard, Login, Logout, ForgotPassword, ResetPassword, PlatformRoutes, MyProfile } from "../platform";
import Permission from "../../feature/permisions/premission";


function App() {
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
}

export default App;