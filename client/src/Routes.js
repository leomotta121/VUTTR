import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { IsLogged } from './helper/CustomRouteComponent';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import PageNotFound from './pages/PageNotFound';

const Routes = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <IsLogged path="/signin" component={SignIn} />
      <IsLogged path="/signup" component={SignUp} />
      <Route path="*" component={PageNotFound} />
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default Routes;
