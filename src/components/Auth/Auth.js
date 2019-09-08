import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {error} from '../../utils/notification';

const Auth = ({
  path, props, component: Component,
}) => (<Route
  path={path}
  render={
    (routerProps) => {
      const isAuthenticated = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).token;
      if (isAuthenticated) {
        return <Component {...props} {...routerProps} />;
      }
      error("You need to log-in to access that page");
      return <Redirect to={process.env.PUBLIC_URL +"/login"} />;
    }
  }
/>
);

export default Auth;