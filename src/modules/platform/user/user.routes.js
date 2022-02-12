import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import Users from "./components/users.component";
import UserManagement from "./components/user-management.component";
import UserDetails from "./components/user-details.component";
import PrivateRoute from "../../core/PrivateRoute";
import AddNewUser from "./components/creat-admin/creatNewAdmin.component";

function UserRoutes() {
    const { path } = useRouteMatch();
    console.log(path);

    return (
        <Switch>
            <PrivateRoute exact path={path} component={UserManagement} />
            <PrivateRoute path={`${path}/users/:id`} component={UserDetails} />
            <PrivateRoute path={`${path}/users`} component={Users} />
            <PrivateRoute path={`${path}/create-new`} component={AddNewUser} />
        </Switch>
    );
}

export default UserRoutes;
