import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../../../../core/PrivateRoute';

import MyProfile from "./components/my-profile.component";
import UpdateMyProfile from "./components/update-my-profile.component";

const MyProfileRoutes = (props) => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <PrivateRoute exact path={path} component={MyProfile} />
            <PrivateRoute
                path={`${path}/update-my-profile`}
                component={UpdateMyProfile}
            />
        </Switch>
    );
};

export default MyProfileRoutes;
