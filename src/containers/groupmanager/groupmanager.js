import React, { Component } from 'react';
import {Router,NavLink,Route, Redirect,Switch} from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { GroupMember } from './groupmember';
import { GroupKernel } from './groupkernel';
import { GroupKernelExt} from './groupkernelext';
import { GroupDict} from './groupdict';
import { AddMember } from './addmember';
import { EditMember } from './editmember';
import { AddKernel } from './addkernel';
import { EditKernel } from './editkernel';
import { KernelField } from './kernelfield';
import { AddField } from './addfield';
import { EditField } from './editfield';
import { AddFeature } from './addfeature';
import { EditFeature } from './editfeature';
import { KernelFeature } from './kernelfeature';
import { AddDict } from './adddict';
import { EditDict } from './editdict';
import { DictItem } from './dictitem';

import './groupmanager.css';
class GroupManager extends Component {

  render() {
    const baseRoute = '/groupmanager';
    const { pathname,params } = this.props.location;
    const routerData = [
      {name: '用户管理', to: '', path:'' , parentPath: '', comp: GroupMember}, /** default */
      {name: '用户管理', to: '/groupmember', path:'/groupmember' , parentPath: '', comp: GroupMember}, /** default */
      {name: '业务对象管理', to: '/groupkernel', path:'/groupkernel' , parentPath: '', comp: GroupKernel}, 
      {name: '业务对象标签', to: '/groupkernelext', path:'/groupkernelext' , parentPath: '', comp: GroupKernelExt},
      {name: '数据字典', to: '/groupdict', path:'/groupdict', parentPath: '', comp: GroupDict},
      {name: '添加用户', to: '/addmember', path:'/addmember' , parentPath: '/groupmember', comp: AddMember},  
      {name: '编辑用户', to: '/editmember', path:'/editmember' , parentPath: '/groupmember', comp: EditMember},  
      {name: '添加业务对象', to: '/addkernel', path:'/addkernel' , parentPath: '/groupkernel', comp: AddKernel},  
      {name: '编辑业务对象', to: '/editkernel', path:'/editkernel' , parentPath: '/groupkernel', comp: EditKernel}, 
      {name: '业务对象字段列表', to: '/kernelfield', path:'/kernelfield' , parentPath: '/groupkernel', comp: KernelField}, 
      {name: '添加字段', to: '/addfield', path:'/addfield' , parentPath: '/groupkernel/kernelfield', comp: AddField},
      {name: '编辑字段', to: '/editfield', path:'/editfield' , parentPath: '/groupkernel/kernelfield', comp: EditField},
      {name: '对象特征', to: '/kernelfeature', path:'/kernelfeature' , parentPath: '/groupkernel', comp: KernelFeature},
      {name: '添加特征', to: '/addfeature', path:'/addfeature' , parentPath: '/groupkernel/kernelfeature', comp: AddFeature},
      {name: '编辑特征', to: '/editfeature', path:'/editfeature' , parentPath: '/groupkernel/kernelfeature', comp: EditFeature},
      {name: '添加字典', to: '/adddict', path:'/adddict' , parentPath: '/groupdict', comp: AddDict},
      {name: '编辑字典', to: '/editdict', path:'/editdict' , parentPath: '/groupdict', comp: EditDict},
      {name: '字典条目', to: '/dictitem', path:'/dictitem' , parentPath: '/groupdict', comp: DictItem},
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
          return (<NavLink key ={idx} color="inherit" to ={ {pathname: baseRoute+routerData[idx].parentPath+routerData[idx].to ,params: params}}>
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
                  }).map((item,index) =>{
                  return (
                          <ListItem button key= {index}>  
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

export default GroupManager;
