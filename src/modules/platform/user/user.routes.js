import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';

import Users from './components/users.component';
import UserManagement from './components/user-management.component';
import UserDetails from './components/user-details.component';
import PrivateRoute from '../../core/PrivateRoute';
import UserForm from './components/user-form.component';
import UpdateUser from './components/update-delete/updateUser.component';
// import UpdateDeleteComponent from "./components/update-delete/update-delete.component";
import Permission from '../permission/component/permission.component';
import Role from '../role/component/role.component';
import Service from '../service/component/service.component';
import Profile from '../profile/component/profile.component';

function UserRoutes() {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoute exact path={path} component={UserManagement} />
            <PrivateRoute
                path={`${path}/users/:id/update`}
                component={UpdateUser}
            />
            <PrivateRoute path={`${path}/users/create`} component={UserForm} />
            <PrivateRoute path={`${path}/users/:id`} component={UserDetails} />
            <PrivateRoute path={`${path}/users`} component={Users} />

            <PrivateRoute path={`${path}/permission`} component={Permission} />
            <PrivateRoute path={`${path}/role`} component={Role} />
            <PrivateRoute path={`${path}/service`} component={Service} />
            <PrivateRoute path={`${path}/profile`} component={Profile} />
        </Switch>
    );
}

export default UserRoutes;
