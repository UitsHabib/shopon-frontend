import { useRouteMatch } from "react-router-dom";
import { Switch } from "react-router-dom";

import PrivateRoute from "../../core/PrivateRoute";
import Permissions from "./components/permissions.component";


const PermissionRoutes = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoute path={`${path}/permissions`} component = { Permissions } />
        </Switch>
    );
}
 
export default PermissionRoutes;