import React, { Component } from 'react';
import {NavLink,Route,Switch} from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { GroupMgr } from './groupmgr';
import { GroupUser } from './groupuser';
import { SysLog } from './syslog';
import { SysDict} from './sysdict';
import { AddGroup } from './addgroup';
import { EditGroup } from './editgroup';
import { AddUser } from  './adduser';
import { EditUser } from './edituser';

import './sysmanager.css';
class SysManager extends Component {


  render() {
    const baseRoute = '/sysmanager';
    const { pathname,params } = this.props.location;
    const routerData = [
      {name: '组织管理', to: '', path:'' , parentPath: '', comp: GroupMgr}, 
      {name: '组织管理', to: '/groupmgr', path:'/groupmgr' , parentPath: '', comp: GroupMgr}, 
      {name: '系统日志', to: '/syslog', path:'/syslog' , parentPath: '', comp: SysLog}, 
      {name: '数据字典', to: '/sysdict', path:'/sysdict', parentPath: '', comp: SysDict},
      {name: '添加组织', to: '/addgroup', path:'/addgroup', parentPath: '/groupmgr', comp: AddGroup},
      {name: '修改组织', to: '/editgroup', path:'/editgroup', parentPath: '/groupmgr', comp: EditGroup},
      {name: '组织用户', to: '/groupuser', path:'/groupuser' , parentPath: '/groupmgr', comp: GroupUser},
      {name: '添加用户', to: '/adduser', path:'/adduser' , parentPath: '/groupmgr/groupuser', comp: AddUser},  
      {name: '编辑用户', to: '/edituser', path:'/edituser' , parentPath: '/groupmgr/groupuser', comp: EditUser},  
    ];
    const pathList = pathname.split("/").filter((item) => {
      return item.length>0 && (baseRoute !== '/'+item);
    });
    const breadContent = pathList.map( (item) =>{
      for(var idx in routerData)
      {
        let pName = routerData[idx].to;
        if( pName === ('/'+item))
        {
          return (<NavLink key={idx} color="inherit" to ={ {pathname: baseRoute+routerData[idx].parentPath+routerData[idx].to ,params: params}}>
                    {routerData[idx].name}
                  </NavLink>
                  )
        }
      }
    });
    //location.split('/')
    return (
      <div className="task-index">
          <div className="menu-con pull-left">
            <List component="nav" aria-label="Main mailbox folders">
              {
                routerData.filter((item) =>{
                    return item.parentPath.length < 1 && item.path.length >1;
                  }).map((item,idx) =>{
                  return (
                          <ListItem button key = {idx} >  
                              <NavLink to= { baseRoute+item.parentPath+item.to}>
                                {item.name}
                              </NavLink>
                          </ListItem>
                          )
                })
              }
            </List>
          </div>
          <div className="main-con pull-left">
              <Breadcrumbs separator="›" aria-label="Breadcrumb">
                {breadContent}
              </Breadcrumbs>
              <div className="content-con">
                
                <Switch>
                  {
                    routerData.map((item) =>{
                      return (
                              <Route path={baseRoute+item.parentPath+item.path} exact key={item.name}
                                component={item.comp}  
                              />
                              )
                    })
                  }
                </Switch>    
              </div>
          </div>
      </div>
      )
  }
}

export default SysManager;
