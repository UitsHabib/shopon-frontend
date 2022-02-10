import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";

import Users from "./components/users.component";
import UserManagement from "./components/user-management.component";
import UserDetails from "./components/user-details.component";
import PrivateRoute from "../../core/PrivateRoute";
import UpdateUser from "./components/update-delete/updateUser.component";
import UpdateDeleteComponent from "./components/update-delete/update-delete.component";

function UserRoutes() {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoute exact path={path} component={UserManagement} />
            <PrivateRoute path={`${path}/users/:id`} component={UserDetails} />
            <PrivateRoute path={`${path}/users`} component={Users} />
            <PrivateRoute path={`${path}/updateDelete/updateUser`} component={UpdateUser} />
            <PrivateRoute path={`${path}/updateDelete`} component={UpdateDeleteComponent} />
        </Switch>
    );
}

export default UserRoutes;
