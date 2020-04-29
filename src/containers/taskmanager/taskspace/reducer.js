/* jshint esversion: 6 */

import {
    TASKMANAGER_TASKSPACE_QUERY_REQUEST,TASKMANAGER_TASKSPACE_QUERY_SUCCESS,TASKMANAGER_TASKSPACE_QUERY_FAILURE,
    TASKMANAGER_TASKSPACE_KERNEL_AVALIABLE_REQUEST,TASKMANAGER_TASKSPACE_KERNEL_AVALIABLE_SUCCESS,TASKMANAGER_TASKSPACE_KERNEL_AVALIABLE_FAILURE,
  } from "./actionTypes";
  
  const initialState = {
  
  };
  
  export default (state = initialState,action)  => {
    switch (action.type) {
        case TASKMANAGER_TASKSPACE_QUERY_SUCCESS:
          return Object.assign({}, state, {
            refLayerlist: action.payload.refLayerlist,
          });
        case TASKMANAGER_TASKSPACE_KERNEL_AVALIABLE_SUCCESS:
          return Object.assign({}, state, {
            kernellist: action.payload.kernellist,
          });    
      default:
        return state;
    }
  };
  