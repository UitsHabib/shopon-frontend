import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../../core/PrivateRoute';
import CreateProfile from './components/common/create-profile.component';
import Profiles from './components/profiles.component';

function ProfileRoutes() {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoute path={`${path}/profiles`} component={Profiles} />
            <PrivateRoute path={`${path}/profiles/create`} component={CreateProfile} />
        </Switch>
    );
}

export default ProfileRoutes;
