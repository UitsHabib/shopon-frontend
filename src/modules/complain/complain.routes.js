import React from 'react';
import { Switch, useRouteMatch } from "react-router-dom";
import PrivateRoute from '../../core/PrivateRoute';
import Complains from "./components/complains.component";

const ComplainRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <PrivateRoute path={`${path}`} component={Complains} />
        </Switch>
    );
}

export default ComplainRoutes;