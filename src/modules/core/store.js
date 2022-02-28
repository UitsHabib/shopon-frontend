import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { applyMiddleware, createStore, compose } from "redux";
import { logger } from "redux-logger";
import reducers from "./reducers";

const middlewares = [promise, thunk, logger];

let composeEnhancers = compose;

if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
	composeEnhancers =
		(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
			window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				trace: true,
				traceLimit: 25,
			})) ||
		compose;
}

export default composeEnhancers(applyMiddleware(...middlewares))(createStore)(
	reducers
);
