import React from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from "./components/navbar.component";

import getLoggedInUser from "./service/get-logged-in-user";

export default function PrivateRoute({ component: Component, ...rest }) {
    const loggedInUser = getLoggedInUser();
    console.log(rest);
    
    return (
        <Route {...rest} render={props => {
            return (
                loggedInUser ? (
                    <>
                        <Navbar path={rest.path} />
                        <Component {...props}/>
                    </>
                ) : (
                    <Redirect push to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }} />
                )
            );
        }}/>
    )
}
