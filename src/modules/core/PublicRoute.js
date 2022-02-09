import React from "react";
import { Route, Redirect } from "react-router-dom";

import getLoggedInUser from "./service/get-logged-in-user";

export default function PublicRoute({ component: Component, ...rest }) {
    const loggedInUser = getLoggedInUser();
    
    return (
        <Route {...rest} render={props => {
            return (
                loggedInUser ? (
                    <Redirect push to={{
                        pathname: props.location.state
                            ? props.location.state.from.pathname
                            : "/",
                        search: props.location.state
                            ? props.location.state.from.search
                            : "",
                        state: { from: props.location }
                    }} />
                ) : (
                    <Component {...props}/>
                )
            );
        }}/>
    )
}
