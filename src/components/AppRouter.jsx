import React, {useContext} from 'react';
import {AuthContext} from "../context/context";
import {adminRoutes, routes, userRoutes} from "../routes/routes";
import LoaderPage from "../pages/LoaderPage";
import {Redirect, Route, Switch} from "react-router-dom";

const AppRouter = () => {
    const {isAuth, isLoading, token} = useContext(AuthContext);
    if (isLoading) {
        return (
            <LoaderPage/>
        )
    }
    if (isAuth) {
        if (token.role === 'ADMIN') {
            return (
                <Switch>
                    {adminRoutes.map(route =>
                        <Route
                            component={route.component}
                            path={route.path}
                            exact={route.exact}
                            key={route.path}
                        />
                    )}
                    <Redirect to="/profile"/>
                </Switch>
            )
        } else {
            return (
                <Switch>
                    {userRoutes.map(route =>
                        <Route
                            component={route.component}
                            path={route.path}
                            exact={route.exact}
                            key={route.path}
                        />
                    )}
                    <Redirect to="/profile"/>
                </Switch>
            )
        }

    } else {
        return (

            <Switch>
                {routes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Redirect to="/login"/>
            </Switch>
        )
    }
};

export default AppRouter;