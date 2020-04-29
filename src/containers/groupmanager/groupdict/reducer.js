/* jshint esversion: 6 */

import {
    GROUPMANAGER_DICT_QUERY_REQUEST,GROUPMANAGER_DICT_QUERY_SUCCESS,GROUPMANAGER_DICT_QUERY_FAILURE,
    GROUPMANAGER_DICT_USER_AVALIABLE_REQUEST,GROUPMANAGER_DICT_USER_AVALIABLE_SUCCESS,GROUPMANAGER_DICT_USER_AVALIABLE_FAILURE,
  } from "./actionTypes";
  
  const initialState = {
    dictlist:[],
    totalCount:0
  };
  export default (state = initialState,action)  => {
    switch (action.type) {
        case GROUPMANAGER_DICT_QUERY_SUCCESS:
          return Object.assign({}, state, {
            dictlist: action.payload.dictlist,
            totalCount: action.payload.totalCount,
          });
        case GROUPMANAGER_DICT_USER_AVALIABLE_SUCCESS:
          return Object.assign({}, state, {
            avuserlist: action.payload.avuserlist,
          });    
      default:
        return state;
    }
  };
  