import React, { Component } from 'react';
import { Router, Route,Switch } from "react-router-dom";
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import history from './components/history';
import Homepage from './components/homepage';
import Dashboard from './components/dashboard';
import View from './components/view';
import Metrics from './components/metrics';
import AuthenticateComponent from './components/AuthenticateComponent'


class App extends Component {
  render() { 
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={"/"} component={Homepage} />
          <AuthenticateComponent>
            <Route exact path={"/add_employee"} component={Dashboard} />
            <Route exact path={"/view_employee"} component={View} />
            <Route exact path={"/addMetrics"} component={Metrics} />
          </AuthenticateComponent>
        </Switch>
      </Router>
    );
  }
}
 
export default App;
