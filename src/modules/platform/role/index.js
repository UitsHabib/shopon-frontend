import Roles from "./components/roles.component";
import RoleRoutes from "./role.routes";

export function RoleClientRoutes(props) {
    return <RoleRoutes path={props.path} />;
}

export { Roles };
