/* jshint esversion: 6 */

import {
    GROUPMANAGER_GROUPKERNEL_QUERY_REQUEST,GROUPMANAGER_GROUPKERNEL_QUERY_SUCCESS,GROUPMANAGER_GROUPKERNEL_QUERY_FAILURE,
    GROUPMANAGER_GROUPKERNEL_USER_AVALIABLE_REQUEST,GROUPMANAGER_GROUPKERNEL_USER_AVALIABLE_SUCCESS,GROUPMANAGER_GROUPKERNEL_USER_AVALIABLE_FAILURE,
  } from "./actionTypes";
  
  const initialState = {
    kernellist:[],
    totalCount:0
  };
  export default (state = initialState,action)  => {
    switch (action.type) {
        case GROUPMANAGER_GROUPKERNEL_QUERY_SUCCESS:
          return Object.assign({}, state, {
            kernellist: action.payload.kernellist,
            totalCount: action.payload.totalCount,
          });
        case GROUPMANAGER_GROUPKERNEL_USER_AVALIABLE_SUCCESS:
          return Object.assign({}, state, {
            avuserlist: action.payload.avuserlist,
          });    
      default:
        return state;
    }
  };
  