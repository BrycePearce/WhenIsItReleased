import React from 'react';
import { render } from 'react-dom';
import Container from './Container';
import Details from './Details';
import { Router, Route, browserHistory, Redirect } from 'react-router';
render((
  <Router history={browserHistory}>
    <Route path="/" component={Container} />
    <Route path="/details" component={Details} />
    <Redirect from="*" to="/" />

  </Router>

), document.getElementById('container'))