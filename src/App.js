import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from './components/main';
import Login from './components/login';
import Forgot from './components/forgot';
import Register from './components/register';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/forgot" component={Forgot} />
      <Route path="/register" component={Register} />
      <Route path="/main" component={Main} />
    </div>
  </Router>
);

export default App;