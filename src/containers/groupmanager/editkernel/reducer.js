/* jshint esversion: 6 */

import {
  GROUPMANAGER_ADDMEMBER_ADD_REQUEST,GROUPMANAGER_ADDMEMBER_ADD_SUCCESS,GROUPMANAGER_ADDMEMBER_ADD_FAILURE,
  GROUPMANAGER_ADDMEMBER_RANKLIST_ADD_REQUEST,GROUPMANAGER_ADDMEMBER_RANKLIST_ADD_SUCCESS,GROUPMANAGER_ADDMEMBER_RANKLIST_ADD_FAILURE,
  
} from "./actionTypes";

const initialState = {

};

export default (state = initialState,action)  => {
  switch (action.type) {
    case GROUPMANAGER_ADDMEMBER_ADD_REQUEST:
      return Object.assign({}, state, {
          page: action.payload.page,
      });
      case GROUPMANAGER_ADDMEMBER_ADD_SUCCESS:
          return Object.assign({}, state, {
              userinfo: action.payload.userinfo,
          });
      case GROUPMANAGER_ADDMEMBER_RANKLIST_ADD_SUCCESS:
        return Object.assign({}, state, {
            ranklist: action.payload.ranklist,
        }); 
      case GROUPMANAGER_ADDMEMBER_ADD_FAILURE:
          return Object.assign({}, state, {
              error: action.payload.error
          });
    default:
      return state;
  }
};
