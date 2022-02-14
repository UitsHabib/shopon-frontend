import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';

import Roles from './components/roles.component';
import PrivateRoute from '../../core/PrivateRoute';
import RoleUpdate from './components/role-update.component';

function RoleRoutes() {
	const { path } = useRouteMatch();
	// console.log('In RoleRoutes', path);

	return (
		<Switch>
			<PrivateRoute path={`${path}/roles/update/:id`} component={RoleUpdate} />
			<PrivateRoute path={`${path}/roles`} component={Roles} />
		</Switch>
	);
}

export default RoleRoutes;
