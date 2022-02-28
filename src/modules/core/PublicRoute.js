import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import Navbar from './components/navbar.component';

export default function PublicRoute({ component: Component, ...rest }) {
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser);

    return (
        <>
            <Navbar path={rest.path} />
            <Route
                {...rest}
                render={(props) => {
                    return loggedInUser ? (
                        <Redirect
                            push
                            to={{
                                pathname: props.location.state ? props.location.state.from.pathname : '/',
                                search: props.location.state ? props.location.state.from.search : '',
                                state: { from: props.location },
                            }}
                        />
                    ) : (
                        <Component {...props} />
                    );
                }}
            />
        </>
    );
}
