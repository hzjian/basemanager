import React, { Component } from "react";
import PropTypes from "prop-types";

/////////////////////////////////////////////////////////////////////////
// BrowserRouter would be preferred over HashRouter, but BrowserRouter
// would require configuring the server. So we will use HashRouter here.
// Please change to BrowserRouter if you have your own backend server.
///////////////////////////////////////////////////////////////////////////
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { Login } from "../login";
import PrivateRoute from "./privateroute";
import { User } from '../user';
import { Header } from '../../components/header';
import SysManager from '../sysmanager/sysmanager';
import { loadUserProfile } from '../utils/apiUtils';
import { logout } from "../login/actions";
import fetch from 'isomorphic-fetch';

import "./app.css";

class App extends Component {
  handleLogout() {
    const { user } = this.props;
    this.props.dispatch(logout(user));
  }

  render() {
    let userProfie = loadUserProfile();
    let isAuthenticated = false;
    let user;
    if(userProfie) 
    {
      const { sub } = userProfie;
      user = sub;
      isAuthenticated = true && user;
    }
    return (
      <Router>
        <div>
          <div className="container-fluid mainContent">
            <Header user={user} handleLogout={() => this.handleLogout()} />
            <div className="appContent">
              <Switch>
                <PrivateRoute exact path="/" 
                  isAuthenticated={isAuthenticated}
                  component={SysManager} 
                />
                <Route path="/login" 
                  component={Login} 
                />
                <PrivateRoute
                  path="/users"
                  isAuthenticated={isAuthenticated}
                  component={User}
                />
                <PrivateRoute
                  path="/sysmanager"
                  isAuthenticated={isAuthenticated}
                  component={SysManager}
                />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  return {
    user: auth ? auth.user : null
  };
};

export default connect(mapStateToProps)(App);
