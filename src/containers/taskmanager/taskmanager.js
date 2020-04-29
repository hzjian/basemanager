import React, { Component } from 'react';
import {Router,NavLink,Route, Redirect,Switch} from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { TaskList } from './tasklist';
import { RefTaskList } from './reftasklist';
import { CreateTask} from './createtask';
import { ModifyTask} from './modifytask';
import { TaskField } from './taskfield';
import { AddField } from './addfield';
import { RefLayer } from './reflayer';
import { TaskSpace } from './taskspace';
import { TaskUser } from './taskuser';
import { RefLayerField } from './reflayerfield';


import './taskmanager.css';
class TaskManager extends Component {


  render() {
    const baseRoute = '/utaskmanager';
    const { pathname,params } = this.props.location;
    const routerData = [
      {name: '我创建的任务', to: '', path:'' , parentPath: '', comp: TaskList}, /** default */
      {name: '我创建的任务', to: '/tasklist', path:'/tasklist' , parentPath: '', comp: TaskList}, 
      {name: '我参与的任务', to: '/reftasklist', path:'/reftasklist' , parentPath: '', comp: RefTaskList},
      {name: '创建任务', to: '/createtask', path:'/createtask', parentPath: '/tasklist', comp: CreateTask},
      {name: '修改任务', to: '/modifytask', path:'/modifytask', parentPath: '/tasklist', comp: ModifyTask},
      {name: '配置字段', to: '/taskfield', path:'/taskfield', parentPath: '/tasklist', comp: TaskField},
      {name: '添加字段', to: '/addfield', path:'/addfield', parentPath: '/tasklist/taskfield', comp: AddField},
      {name: '参考图层', to: '/reflayer', path:'/reflayer', parentPath: '/tasklist', comp: RefLayer},
      {name: '配置字段', to: '/reflayerfield', path:'/reflayerfield', parentPath: '/tasklist/reflayer', comp: RefLayerField},
      {name: '任务空间', to: '/taskspace', path:'/taskspace', parentPath: '/tasklist', comp: TaskSpace},
      {name: '用户管理', to: '/taskuser', path:'/taskuser', parentPath: '/tasklist', comp: TaskUser},
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
          return (<NavLink key = {idx}  color="inherit" to ={ {pathname: baseRoute+routerData[idx].parentPath+routerData[idx].to ,params: params}}>
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
                  }).map((item) =>{
                  return (
                          <ListItem button key = {item.path}>  
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

export default TaskManager;
