import React, { useEffect, useState } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/navbar.component";
import NavbarShop from "./shop/components/navbar.component";
import CustomerNav from "../customer/components/customerNavbar.component";

export default function PublicRoute({ component: Component, ...rest }) {
    const loggedInUser = useSelector((state) => state.userReducer.loggedInUser);
    const loggedInShop = useSelector((state) => state.shopReducer.loggedInShop);

    const [loggedInAs, setLoggedInAs] = useState("");

    const currentPathname = useLocation().pathname;
    console.log(currentPathname);

    useEffect(() => {
        if (currentPathname === "/shop-login") setLoggedInAs("shop");
        else if (currentPathname === "/") setLoggedInAs("customer");
        else if (currentPathname === "/admin/login") setLoggedInAs("user");
        else if (currentPathname === "/login") setLoggedInAs("customer");
        else if (currentPathname === "/signup") setLoggedInAs("customer");
        else if (currentPathname.startsWith("/product"))
            setLoggedInAs("customer");
    }, []);

    return (
        <>
            {loggedInAs === "user" && (
                <>
                    <Navbar path={rest.path} />
                    <Route
                        {...rest}
                        render={(props) => {
                            return loggedInUser ? (
                                <Redirect
                                    push
                                    to={{
                                        pathname: props.location.state
                                            ? props.location.state.from.pathname
                                            : "/admin",
                                        search: props.location.state
                                            ? props.location.state.from.search
                                            : "",
                                        state: { from: props.location },
                                    }}
                                />
                            ) : (
                                <Component {...props} />
                            );
                        }}
                    />
                </>
            )}
            {loggedInAs === "shop" && (
                <>
                    <NavbarShop path={rest.path} />
                    <Route
                        {...rest}
                        render={(props) => {
                            return loggedInShop ? (
                                <Redirect
                                    push
                                    to={{
                                        pathname: props.location.state
                                            ? props.location.state.from.pathname
                                            : "/shop-dashboard",
                                        search: props.location.state
                                            ? props.location.state.from.search
                                            : "",
                                        state: { from: props.location },
                                    }}
                                />
                            ) : (
                                <Component {...props} />
                            );
                        }}
                    />
                </>
            )}

            {loggedInAs === "customer" && (
                <>
                    <CustomerNav path={rest.path} />
                    <Route
                        {...rest}
                        render={(props) => {
                            return <Component {...props} />;
                        }}
                    />
                </>
            )}
        </>
    );
}
