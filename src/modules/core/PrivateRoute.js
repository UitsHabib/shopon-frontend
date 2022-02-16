import React from 'react';
import { useLocation } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import IdleTimerContainer from './components/idle-timer.component';
import Navbar from './components/navbar.component';
import Breadcrumbs from './components/breadcrumb.component';

import getLoggedInUser from './service/get-logged-in-user';

export default function PrivateRoute({ component: Component, ...rest }) {
	const loggedInUser = getLoggedInUser();
  const currentPathname = useLocation().pathname;
	// console.log(rest);

	return (
		<Route
			{...rest}
			render={(props) => {
				return loggedInUser ? (
					<>
						<Navbar path={rest.path} />
            <IdleTimerContainer currentPathname={currentPathname} />
						<Breadcrumbs />
						<Component {...props} />
					</>
				) : (
					<Redirect
						push
						to={{
							pathname: '/login',
							state: { from: props.location },
						}}
					/>
				);
			}}
		/>
	);
}
