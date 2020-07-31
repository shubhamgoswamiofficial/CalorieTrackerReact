import React, { Component } from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import { createBrowserHistory } from 'history';

import Login from './components/login/Login';
import Register from './components/register/Register';
import Layout from './components/Layout';

const history = createBrowserHistory();

history.listen((location, action) => {
  window.scrollTo(0, 0)
})


class Routers extends Component {
  render() {
    axios.defaults.headers.common['accessToken'] = `${localStorage.getItem('accessToken')}`;
    axios.defaults.headers.common['Authorization'] = `${'Basic ZGVtbzpkZW1v'}`;
    return (
      <Router history={history}>
        <div className="app">
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Layout} />
          <Redirect from="/" to="/dashboard" />
        </div>
      </Router>
    );
  }
}

export default Routers;