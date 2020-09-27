import React from 'react';
import { Route } from 'react-router-dom';

const renderRoutes = (routes: any) => {
  return routes.map((route: any, index: number) => {
    const { path, exact } = route;
    return <Route key={index} path={path} exact={exact} render={prop => <route.component {...prop} />} />;
  });
};

export default renderRoutes;
