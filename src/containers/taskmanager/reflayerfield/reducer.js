/* jshint esversion: 6 */

import {
  TASKMANAGER_REFLAYERFIELD_QUERY_REQUEST,TASKMANAGER_REFLAYERFIELD_QUERY_SUCCESS,TASKMANAGER_REFLAYERFIELD_QUERY_FAILURE,
   TASKMANAGER_REFLAYERFIELD_AVALIABLE_QUERY_REQUEST,TASKMANAGER_REFLAYERFIELD_AVALIABLE_QUERY_SUCCESS,TASKMANAGER_REFLAYERFIELD_AVALIABLE_QUERY_FAILURE,
  TASKMANAGER_REFLAYERFIELD_ADD_EXIST_SUCCESS,TASKMANAGER_REFLAYERFIELD_DELETE_SUCCESS,
} from "./actionTypes";

const initialState = {
    fieldlist:[],
    totalCount:0
};

export default (state = initialState,action)  => {
  switch (action.type) {
      case TASKMANAGER_REFLAYERFIELD_QUERY_REQUEST:
        return Object.assign({}, state, {
            page: action.payload.page,
        });
      case TASKMANAGER_REFLAYERFIELD_QUERY_SUCCESS:
          return Object.assign({}, state, {
              fieldlist: action.payload.fieldlist,
              totalCount: action.payload.totalCount
          });    
      case TASKMANAGER_REFLAYERFIELD_AVALIABLE_QUERY_SUCCESS:
          return Object.assign({},state,{
              attrList: action.payload.attrList,
          });    
      case TASKMANAGER_REFLAYERFIELD_ADD_EXIST_SUCCESS:
          return Object.assign({},state,{
              addField: action.payload.addField
          }); 
      case TASKMANAGER_REFLAYERFIELD_DELETE_SUCCESS:
          return Object.assign({},state,{
              deleteField: action.payload.deleteField
          });  
      case TASKMANAGER_REFLAYERFIELD_QUERY_FAILURE:
          return Object.assign({}, state, {
              error: action.payload.error
          });
    default:
      return state;
  }
};
