import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import UserProfile from "./userprofile";
import { loadUserProfile } from '../../containers/utils/apiUtils';
import "./header.css";

const routerData = [
  //ROLE_USER
  {name: '我的内容', key: 'item1' , path:'/ucontent'     ,  role :'ROLE_USER'}, 
  {name: '我的任务', key: 'item2' , path:'/utaskmanager' ,  role :'ROLE_USER'}, 

  //ROLE_GROUP_ADMIN  
  //{name: '系统管理', key: 'item3' , path:'/groupmanager' , role :'ROLE_ADMIN'}, 
  //{name: '任务管理', key: 'item4' , path:'/utaskmanager' , role :'ROLE_ADMIN'}, 
  //{name: '数据源管理', key: 'item10' , path:'/dsmanager' , role :'ROLE_ADMIN'},

  //ROLE_ADMIN  
  {name: '系统管理', key: 'item5' , path:'/sysmanager'   , role :'ROLE_ADMIN'},
];

class Header extends Component {
  onLogoutClick = event => {
    event.preventDefault();
    this.props.handleLogout();
    this.props.history.replace("/login");
  };

  render() {
    const { user } = this.props;
    const pathname = this.props.history.location.pathname;
    const isLoginPage = pathname.indexOf("login") > -1;
    const isAboutPage = pathname.indexOf("about") > -1;
    const isUsersPage = pathname.indexOf("users") > -1;
    const isReposPage = pathname.indexOf("repos") > -1;

    let userProfie = loadUserProfile();
    let roleName; 
    if(userProfie) 
    {
      const { scope } = userProfie;
      if(scope && scope.length>0 && scope[0])
      {
        roleName= scope[0].authority;
      }
    }
    return (
      !isLoginPage &&
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <Link to="/" className="navbar-brand">
          <div title="Home" className="brand" />
        </Link>
        <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
          <span className="navbar-toggler-icon" />
        </button>
        
        <div id="navbarCollapse" className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto ">
            {
              routerData.filter((item) =>{
                    return roleName === item.role;
                }).map((item) =>{
                  return(
                    <li
                      title= { item.name }
                      key = {item.key}
                      className={isUsersPage ? "nav-item active" : "nav-item"}>
                      <Link className="nav-link" to= {item.path } >{ item.name }</Link>
                    </li>
                  )
                })
            }
           
          </ul>

          <ul className="navbar-nav mt-2 mt-md-0">
            {/** <Alerts />*/}
            <UserProfile user={user} handleLogout={this.onLogoutClick} />
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);
