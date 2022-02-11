import PermissionsRoutes from "./permissions.routes";

const PermissionsClientRoutes = (props) => {
    return (
        <PermissionsRoutes path={props.path} />
    );
}
 
export default PermissionsClientRoutes;