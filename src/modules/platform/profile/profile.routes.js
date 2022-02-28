import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../../core/PrivateRoute';
import Profiles from './components/profiles.component';

function ProfileRoutes() {
	const { path } = useRouteMatch();

	return (
		<Switch>
			<PrivateRoute path={`${path}/profiles`} component={Profiles} />
		</Switch>
	);
}

export default ProfileRoutes;
