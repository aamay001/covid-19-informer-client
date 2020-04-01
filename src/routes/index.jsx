import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from '../config/constants';
import Home from './Home.route';

const AppRoutes = () => (
  <Switch>
    <Route exact path={ROUTES.WITH_SELECTION.PATH} component={Home} />
    <Route exact path={ROUTES.HOME.PATH} component={Home} />
    <Route component={Home} />
  </Switch>
);

export default AppRoutes;
