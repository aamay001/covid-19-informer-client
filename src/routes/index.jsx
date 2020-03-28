import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from '../config/constants';
import Home from './Home.route';
import Sample from './Sample.route';

const AppRoutes = () => (
  <Switch>
    <Route exact path={ROUTES.HOME.PATH} component={Home} />
    {ROUTES.SAMPLE.ENABLED &&
      <Route exact path={ROUTES.SAMPLE.PATH} component={Sample} />}
    <Route component={Home} />
  </Switch>
);

export default AppRoutes;
