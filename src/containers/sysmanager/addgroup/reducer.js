/* jshint esversion: 6 */

import {
  SYSMANAGER_GROUPMGR_ADD_REQUEST,SYSMANAGER_GROUPMGR_ADD_SUCCESS,SYSMANAGER_GROUPMGR_ADD_FAILURE,
  SYSMANAGER_GROUPMGR_RANKLIST_ADD_REQUEST,SYSMANAGER_GROUPMGR_RANKLIST_ADD_SUCCESS,SYSMANAGER_GROUPMGR_RANKLIST_ADD_FAILURE,
  
} from "./actionTypes";

const initialState = {

};

export default (state = initialState,action)  => {
  switch (action.type) {
    case SYSMANAGER_GROUPMGR_ADD_REQUEST:
      return Object.assign({}, state, {
          page: action.payload.page,
      });
      case SYSMANAGER_GROUPMGR_ADD_SUCCESS:
          return Object.assign({}, state, {
              fieldlist: action.payload.fieldlist,
              totalCount: action.payload.totalCount
          });
      case SYSMANAGER_GROUPMGR_RANKLIST_ADD_SUCCESS:
        return Object.assign({}, state, {
            ranklist: action.payload.ranklist,
        }); 
      case SYSMANAGER_GROUPMGR_ADD_FAILURE:
          return Object.assign({}, state, {
              error: action.payload.error
          });
    default:
      return state;
  }
};
