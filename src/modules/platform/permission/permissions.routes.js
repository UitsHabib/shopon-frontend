import { useRouteMatch } from "react-router-dom";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../core/PrivateRoute";

import Permission from "./components/permission.component";
import Permissions from "./components/permissions.component";


const PermissionsRoutes = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoute path={`${path}/permissions/:id`} component={ Permission } />
            <PrivateRoute path={`${path}/permissions`} component = { Permissions } />
        </Switch>
    );
}
 
export default PermissionsRoutes;