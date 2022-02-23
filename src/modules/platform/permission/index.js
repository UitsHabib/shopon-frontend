import PermissionRoutes from "./permission.routes";
import permissionReducer from "./permission.reducer";

export const PermissionClientRoutes = (props) => {
    return (
        <PermissionRoutes path={props.path} />
    );
}

export {
    permissionReducer
}
 
