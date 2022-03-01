import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import IdleTimerContainer from "./components/idle-timer.component";
import Navbar from "./components/navbar.component";
import NavbarShop from "./shop/components/navbar.component";
import Breadcrumbs from "./components/breadcrumb.component";

export default function PrivateRoute({ component: Component, ...rest }) {
    const loggedInUser = useSelector((state) => state.userReducer.loggedInUser);
    const loggedInShop = useSelector((state) => state.shopReducer.loggedInShop);

    const loggedInAs = loggedInShop ? "shop" : loggedInUser ? "user" : "";

    const currentPathname = useLocation().pathname;

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
                                    pathname: "/admin/login",
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
