/* jshint esversion: 6 */

import {
  GROUPMANAGER_ADDFIELD_ADD_REQUEST,GROUPMANAGER_ADDFIELD_ADD_SUCCESS,GROUPMANAGER_ADDFIELD_ADD_FAILURE,
  GROUPMANAGER_ADDFIELD_RANKLIST_ADD_REQUEST,GROUPMANAGER_ADDFIELD_RANKLIST_ADD_SUCCESS,GROUPMANAGER_ADDFIELD_RANKLIST_ADD_FAILURE,
  
} from "./actionTypes";

const initialState = {
  fieldlist:[],
  totalCount:0
};

export default (state = initialState,action)  => {
  switch (action.type) {
    case GROUPMANAGER_ADDFIELD_ADD_REQUEST:
      return Object.assign({}, state, {
          page: action.payload.page,
      });
      case GROUPMANAGER_ADDFIELD_ADD_SUCCESS:
          return Object.assign({}, state, {
              fieldlist: action.payload.fieldlist,
              totalCount: action.payload.totalCount
          });
      case GROUPMANAGER_ADDFIELD_RANKLIST_ADD_SUCCESS:
        return Object.assign({}, state, {
            ranklist: action.payload.ranklist,
        }); 
      case GROUPMANAGER_ADDFIELD_ADD_FAILURE:
          return Object.assign({}, state, {
              error: action.payload.error
          });
    default:
      return state;
  }
};
