/* jshint esversion: 6 */

import {
    GROUPMANAGER_GROUPMEMBER_QUERY_REQUEST,GROUPMANAGER_GROUPMEMBER_QUERY_SUCCESS,GROUPMANAGER_GROUPMEMBER_QUERY_FAILURE,
  } from "./actionTypes";
  
  const initialState = {
    totalCount:0,
    memberlist:[]
  };
  
  export default (state = initialState,action)  => {
    switch (action.type) {
        case GROUPMANAGER_GROUPMEMBER_QUERY_SUCCESS:
          return Object.assign({}, state, {
            memberlist: action.payload.memberlist,
            totalCount: action.payload.totalCount,
          });   
      default:
        return state;
    }
  };
  