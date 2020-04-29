/* jshint esversion: 6 */

import {
  TASKMANAGER_TASKFIELD_ADD_REQUEST,TASKMANAGER_TASKFIELD_ADD_SUCCESS,TASKMANAGER_TASKFIELD_ADD_FAILURE,
  TASKMANAGER_TASKFIELD_RANKLIST_ADD_REQUEST,TASKMANAGER_TASKFIELD_RANKLIST_ADD_SUCCESS,TASKMANAGER_TASKFIELD_RANKLIST_ADD_FAILURE,
  
} from "./actionTypes";

const initialState = {

};

export default (state = initialState,action)  => {
  switch (action.type) {
    case TASKMANAGER_TASKFIELD_ADD_REQUEST:
      return Object.assign({}, state, {
          page: action.payload.page,
      });
      case TASKMANAGER_TASKFIELD_ADD_SUCCESS:
          return Object.assign({}, state, {
              fieldlist: action.payload.fieldlist,
              totalCount: action.payload.totalCount
          });
      case TASKMANAGER_TASKFIELD_RANKLIST_ADD_SUCCESS:
        return Object.assign({}, state, {
            ranklist: action.payload.ranklist,
        }); 
      case TASKMANAGER_TASKFIELD_ADD_FAILURE:
          return Object.assign({}, state, {
              error: action.payload.error
          });
    default:
      return state;
  }
};
