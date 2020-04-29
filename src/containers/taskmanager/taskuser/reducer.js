/* jshint esversion: 6 */

import {
    TASKMANAGER_TASKUSER_QUERY_REQUEST,TASKMANAGER_TASKUSER_QUERY_SUCCESS,TASKMANAGER_TASKUSER_QUERY_FAILURE,
    TASKMANAGER_TASKUSER_USER_AVALIABLE_REQUEST,TASKMANAGER_TASKUSER_USER_AVALIABLE_SUCCESS,TASKMANAGER_TASKUSER_USER_AVALIABLE_FAILURE,
  } from "./actionTypes";
  
  const initialState = {
    taskuserlist:[],
    totalCount:0
  };
  
  export default (state = initialState,action)  => {
    switch (action.type) {
        case TASKMANAGER_TASKUSER_QUERY_SUCCESS:
          return Object.assign({}, state, {
            taskuserlist: action.payload.taskuserlist,
            totalCount: action.payload.totalCount,
          });
        case TASKMANAGER_TASKUSER_USER_AVALIABLE_SUCCESS:
          return Object.assign({}, state, {
            avuserlist: action.payload.avuserlist,
          });    
      default:
        return state;
    }
  };
  