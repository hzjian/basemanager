/* jshint esversion: 6 */

import {
    SYSMANAGER_GROUPMGR_QUERY_REQUEST,SYSMANAGER_GROUPMGR_QUERY_SUCCESS,SYSMANAGER_GROUPMGR_QUERY_FAILURE,
    SYSMANAGER_GROUPMGR_USER_AVALIABLE_REQUEST,SYSMANAGER_GROUPMGR_USER_AVALIABLE_SUCCESS,SYSMANAGER_GROUPMGR_USER_AVALIABLE_FAILURE,
  } from "./actionTypes";
  
  const initialState = {
    grouplist:[],
    totalCount:0
  };
  export default (state = initialState,action)  => {
    switch (action.type) {
        case SYSMANAGER_GROUPMGR_QUERY_SUCCESS:
          return Object.assign({}, state, {
            grouplist: action.payload.grouplist,
            totalCount: action.payload.totalCount,
          });
        case SYSMANAGER_GROUPMGR_USER_AVALIABLE_SUCCESS:
          return Object.assign({}, state, {
            avuserlist: action.payload.avuserlist,
          });    
      default:
        return state;
    }
  };
  