import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import IdleTimerContainer from "./components/idle-timer.component";
import Navbar from "./components/navbar.component";
import Breadcrumbs from "./components/breadcrumb.component";

export default function PrivateRoute({ component: Component, ...rest }) {
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
    const currentPathname = useLocation().pathname;

    return (
        <Route
            {...rest}
            render={(props) => {
                return loggedInUser ? (
                    <>
                        <Navbar path={rest.path} />
                        <IdleTimerContainer currentPathname={currentPathname} />
                        <Breadcrumbs />
                        <Component {...props} />
                    </>
                ) : (
                    <Redirect
                        push
                        to={{
                            pathname: "/login",
                            state: { from: props.location },
                        }}
                    />
                );
            }}
        />
    );
}
