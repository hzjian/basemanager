/* jshint esversion: 6 */

import {
    SYSMANAGER_GROUPUSER_QUERY_REQUEST,SYSMANAGER_GROUPUSER_QUERY_SUCCESS,SYSMANAGER_GROUPUSER_QUERY_FAILURE,
  } from "./actionTypes";
import { SYSMANAGER_EDITUSER_UPDATE_SUCCESS }  from "../edituser/actionTypes";  
import { SYSMANAGER_ADDUSER_ADD_SUCCESS } from '../adduser/actionTypes';

  const initialState = {
    groupuserlist:[],
    totalCount:0
  };
  
  export default (state = initialState,action)  => {
    switch (action.type) {
        case SYSMANAGER_GROUPUSER_QUERY_SUCCESS:
          return Object.assign({}, state, {
            groupuserlist: action.payload.groupuserlist,
            totalCount: action.payload.totalCount,
          });  
        case SYSMANAGER_EDITUSER_UPDATE_SUCCESS:
          return Object.assign({}, state, {
              userinfo: action.payload.userinfo,
              groupuserlist : state.groupuserlist.map((item) =>{
                if(item && action.payload.userinfo && item.userName === action.payload.userinfo.userName)
                {
                  item.userCnname = action.payload.userinfo.userCnname;
                  item.userEmail = action.payload.userinfo.userEmail;
                }
                return item;
              })
          });  
        case SYSMANAGER_ADDUSER_ADD_SUCCESS:
            return Object.assign({}, state, {
                userinfo: action.payload.userinfo,
                groupuserlist: state.groupuserlist.concat(action.payload.userinfo)
            });     
      default:
        return state;
    }
  };
  