import React from 'react';
import Roles from './components/roles.component';
import RoleRoutes from './role.routes';
import roleReducer from './role.reducer';
import * as roleActions from './role.actions';

export function RoleClientRoutes(props) {
	// console.log('In RoleClientRoutes', props.path);
	return <RoleRoutes path={props.path} />;
}

export { 
	Roles,
	roleReducer,
	roleActions
};
