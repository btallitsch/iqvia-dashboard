import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from './components/main';
import Login from './components/login';
import Forgot from './components/forgot';
import Register from './components/register';
import createHashHistory from 'history/createHashHistory';
    
const hashHistory = createHashHistory({ basename: process.env.PUBLIC_URL });

const App = () => (
  <Router history={hashHistory}>
    <div>
      <Route exact path={process.env.PUBLIC_URL + '/'} component={Login} />
      <Route path={process.env.PUBLIC_URL + '/forgot'} component={Forgot} />
      <Route path={process.env.PUBLIC_URL + '/register'} component={Register} />
      <Route path={process.env.PUBLIC_URL + '/main'} component={Main} />
    </div>
  </Router>
);

export default App;