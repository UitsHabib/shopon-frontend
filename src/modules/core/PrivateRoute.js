import React, { useEffect, useState } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import IdleTimerContainer from "./components/idle-timer.component";
import Navbar from "./components/navbar.component";
import NavbarShop from "./shop/components/navbar.component";
import Breadcrumbs from "./components/breadcrumb.component";

export default function PrivateRoute({ component: Component, ...rest }) {
    const loggedInUser = useSelector((state) => state.userReducer.loggedInUser);
    const loggedInShop = useSelector((state) => state.shopReducer.loggedInShop);

    const [loggedInAs, setLoggedInAs] = useState("");

    const currentPathname = useLocation().pathname;

    console.log(loggedInAs);

    useEffect(() => {
        if(loggedInUser === null) setLoggedInAs('shop');
        else setLoggedInAs('user');
    }, [])

    return (
        <>
            {loggedInAs === "user" && (
                <Route
                    {...rest}
                    render={(props) => {
                        return loggedInUser ? (
                            <>
                                <Navbar path={rest.path} />
                                <IdleTimerContainer
                                    currentPathname={currentPathname}
                                />
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
            )}

            {loggedInAs === "shop" && (
                <Route
                    {...rest}
                    render={(props) => {
                        return loggedInShop ? (
                            <>
                                <NavbarShop path={rest.path} />
                                <IdleTimerContainer
                                    currentPathname={currentPathname}
                                />
                                <Breadcrumbs />
                                <Component {...props} />
                            </>
                        ) : (
                            <Redirect
                                push
                                to={{
                                    pathname: "/shop-login",
                                    state: { from: props.location },
                                }}
                            />
                        );
                    }}
                />
            )}
        </>
    );
}
