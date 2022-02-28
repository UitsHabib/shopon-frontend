import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';

import PrivateRoute from "../../core/PrivateRoute";
import Services from './components/services.component';

const ServicesRoutes = () => {
	const { path } = useRouteMatch();
	return (
		<Switch>
			<PrivateRoute path={`${path}/services`} component={Services} />
		</Switch>
	);
};

export default ServicesRoutes;