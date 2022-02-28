import PermissionRoutes from "./permission.routes";
import permissionReducer from './permission.reducer';
import * as permissionActions from './permission.actions';

export const PermissionClientRoutes = (props) => {
    return (
        <PermissionRoutes path={props.path} />
    );
}
 
export {
    permissionReducer,
    permissionActions
}
