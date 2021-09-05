import React, { Component } from 'react';
import {NavLink,Route,Switch} from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { BucketManager } from './bucketmgr';
import { CompanyManager } from  './companymgr'
import { SysLog } from './syslog';
import { UserManager} from './usermgr';
import { EditUser} from './edituser';
import { EditBucket } from  './editbucket';
import { EditCompany} from  './editcompany';

import './sysmanager.css';
class SysManager extends Component {

  render() {
    const baseRoute = '/sysmanager';
    const { pathname,params } = this.props.location;
    const routerData = [
      /*******************user**********************/
      {name: '用户管理', to: '/usermgr', path:'/usermgr', parentPath: '', comp: UserManager},
      {name: '添加内容', to: '/adduser', path:'/adduser' , parentPath: '/usermgr', comp: EditUser},  
      {name: '编辑内容', to: '/edituser', path:'/edituser' , parentPath: '/usermgr', comp: EditUser},  
      /*******************content**********************/
      {name: '内容管理', to: '/bucketmgr', path:'/bucketmgr' , parentPath: '', comp: BucketManager},
      {name: '添加内容', to: '/addbucket', path:'/addbucket' , parentPath: '/bucketmgr', comp: EditBucket},  
      {name: '编辑内容', to: '/editbucket', path:'/editbucket' , parentPath: '/bucketmgr', comp: EditBucket},  

      /*******************company**********************/
      {name: '会员管理', to: '/companymgr', path:'/companymgr' , parentPath: '', comp: CompanyManager},
      {name: '添加内容', to: '/addcompany', path:'/addcompany' , parentPath: '/companymgr', comp: EditCompany},  
      {name: '编辑内容', to: '/editcompany', path:'/editcompany' , parentPath: '/companymgr', comp: EditCompany},  
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
