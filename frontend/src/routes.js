import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Dashboard from './pages/Company/Dashboard';
import Revenue from './pages/Company/Revenue';
import Expense from './pages/Company/Expense';
import Account from './pages/Company/Account';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/revenue" component={Revenue} />
      <Route path="/expense" component={Expense} />
      <Route path="/account" component={Account} />
    </BrowserRouter>
  );
}

export default Routes;
