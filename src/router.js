import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import PageLogin from './routes/login';
import PageIndex from './routes/index';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={PageIndex} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
