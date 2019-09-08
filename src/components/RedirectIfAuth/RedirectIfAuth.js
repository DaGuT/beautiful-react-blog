import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {error} from '../../utils/notification';

const RedirectIfAuth = ({
    path, props, component: Component,
  }) => (<Route
    path={path}
    render={
      (routerProps) => {
        const isAuthenticated = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).token;
        if (!isAuthenticated) {
          return <Component {...props} {...routerProps} />;
        }
        error("You're already signed it");
        return <Redirect to={process.env.PUBLIC_URL +"/"} />;
      }
    }
  />
  );

  export default RedirectIfAuth;