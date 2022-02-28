import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';

import Users from './components/users.component';
import UserManagement from './components/user-management.component';
// import UserDetails from './components/user-details.component';
import PrivateRoute from '../../core/PrivateRoute';
// import UserForm from './components/user-form.component';
// import UpdateUser from './components/updateUser.component';

function UserRoutes() {
	const { path } = useRouteMatch();

	return (
		<Switch>
			<PrivateRoute exact path={path} component={UserManagement} />
			{/* <PrivateRoute path={`${path}/users/:id/update`} component={UpdateUser} />
			<PrivateRoute path={`${path}/users/create`} component={UserForm} />
			<PrivateRoute path={`${path}/users/:id`} component={UserDetails} /> */}
			<PrivateRoute path={`${path}/users`} component={Users} />
		</Switch>
	);
}

export default UserRoutes;
