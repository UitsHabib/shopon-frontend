import ServicesRoutes from "./service.routes";
import serviceReducer from './service.reducer';
import * as serviceActions from './service.actions';

export function ServiceClientRoutes(props) {
	return <ServicesRoutes path={props.path} />;
}

export {
    serviceReducer,
    serviceActions
}