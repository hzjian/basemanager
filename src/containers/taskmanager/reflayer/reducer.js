/* jshint esversion: 6 */

import {
    TASKMANAGER_REFLAYER_QUERY_REQUEST,TASKMANAGER_REFLAYER_QUERY_SUCCESS,TASKMANAGER_REFLAYER_QUERY_FAILURE,
    TASKMANAGER_REFLAYER_KERNEL_AVALIABLE_REQUEST,TASKMANAGER_REFLAYER_KERNEL_AVALIABLE_SUCCESS,TASKMANAGER_REFLAYER_KERNEL_AVALIABLE_FAILURE,
  } from "./actionTypes";
  
  const initialState = {
    kernellist:[],
    totalCount:0
  };
  
  export default (state = initialState,action)  => {
    switch (action.type) {
        case TASKMANAGER_REFLAYER_QUERY_SUCCESS:
          return Object.assign({}, state, {
            refLayerlist: action.payload.refLayerlist,
          });
        case TASKMANAGER_REFLAYER_KERNEL_AVALIABLE_SUCCESS:
          return Object.assign({}, state, {
            kernellist: action.payload.kernellist,
            totalCount:action.payload.totalCount
          });    
      default:
        return state;
    }
  };
  