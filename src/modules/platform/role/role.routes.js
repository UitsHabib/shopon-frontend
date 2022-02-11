import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";

import Roles from "./components/roles.component";
import PrivateRoute from "../../core/PrivateRoute";

function RoleRoutes() {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoute exact path={`${path}/roles`} component={Roles} />
        </Switch>
    );
}

export default RoleRoutes;
