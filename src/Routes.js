import React from "react";
import { Route, Switch } from "react-router";
import ResultCard from "./pages/ResultCards.js";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound.js";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Main} />
    <Route path="/search" exact component={ResultCard} />
    <Route path="/*" exact component={NotFound} />
  </Switch>
);

export default Routes;
