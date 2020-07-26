import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { About, Home, NotFound, Recipes } from '../../pages';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/recipes" component={Recipes} />
    <Route path="/about" component={About} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
