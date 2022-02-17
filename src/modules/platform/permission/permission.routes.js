import { useRouteMatch } from "react-router-dom";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../core/PrivateRoute";

import PermissionCreate from "./components/permission-create.component";
import PermissionUpdate from "./components/permission-update.component";
import PermissionDetails from "./components/permission-details.component";
import Permissions from "./components/permissions.component";


const PermissionRoutes = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoute path={`${path}/permissions/update/:id`} component={ PermissionUpdate} />
            <PrivateRoute path={`${path}/permissions/create`} component={ PermissionCreate } />
            <PrivateRoute path={`${path}/permissions/:id`} component={ PermissionDetails } />
            <PrivateRoute path={`${path}/permissions`} component = { Permissions } />
        </Switch>
    );
}
 
export default PermissionRoutes;