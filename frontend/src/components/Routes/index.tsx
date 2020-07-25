import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home, Recipes, About, NotFound } from '../../pages';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/recipes" component={Recipes} />
    <Route path="/about" component={About} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
