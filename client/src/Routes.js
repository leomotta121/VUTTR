import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import { IsLogged, PrivateRoute } from './helper/customRouteComponent';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';

const Routes = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="*" component={PageNotFound} />
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default Routes;
