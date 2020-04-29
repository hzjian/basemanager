import React, { Component } from "react";
import PropTypes from "prop-types";

/////////////////////////////////////////////////////////////////////////
// BrowserRouter would be preferred over HashRouter, but BrowserRouter
// would require configuring the server. So we will use HashRouter here.
// Please change to BrowserRouter if you have your own backend server.
///////////////////////////////////////////////////////////////////////////
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { Login } from "../login";
import PrivateRoute from "./privateroute";
import { UserContent } from '../usercontent';
import { InfoBox } from '../usercontent/popup';
import { User } from '../user';
import { Header } from '../../components/header';
import TaskManager from '../taskmanager/taskmanager';
import GroupManager from  '../groupmanager/groupmanager';
import SysManager from '../sysmanager/sysmanager';
import { loadUserProfile } from '../utils/apiUtils';
import { logout } from "../login/actions";

import "./app.css";

const routerData = [
  //ROLE_USER
  {name: '我的内容', key: 'item1' , path:'' ,  comp: UserContent, role :'ROLE_USER'}, 
  {name: '我的内容', key: 'item2' , path:'/ucontent' , comp: UserContent, role :'ROLE_USER'}, 
  {name: '我的任务', key: 'item3' , path:'/utaskmanager' ,  comp: TaskManager,role :'ROLE_USER'}, 

  //ROLE_GROUP_ADMIN  
  {name: '组织管理', key: 'item4' , path:'' , comp: GroupManager, role :'ROLE_GROUP_ADMIN'}, 
  {name: '组织管理', key: 'item5' , path:'/groupmanager' , comp: GroupManager,role :'ROLE_GROUP_ADMIN'}, 
  {name: '任务管理', key: 'item6' , path:'/utaskmanager' , comp: TaskManager, role :'ROLE_GROUP_ADMIN'}, 

  //ROLE_ADMIN  
  {name: '系统管理', key: 'item7' , path:'' ,comp: SysManager, role :'ROLE_ADMIN'}, 
  {name: '系统管理', key: 'item8' , path:'/sysmanager' , comp: SysManager, role :'ROLE_ADMIN'}, 
 
];

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
                  component={UserContent} 
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
                  path="/ucontent"
                  isAuthenticated={isAuthenticated}
                  component={UserContent}
                />
                 <PrivateRoute
                  path="/utaskmanager"
                  isAuthenticated={isAuthenticated}
                  component={TaskManager}
                />
                 <PrivateRoute
                  path="/groupmanager"
                  isAuthenticated={isAuthenticated}
                  component={GroupManager}
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
