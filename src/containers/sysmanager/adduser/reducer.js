/* jshint esversion: 6 */

import {
  SYSMANAGER_ADDUSER_ADD_REQUEST,SYSMANAGER_ADDUSER_ADD_SUCCESS,SYSMANAGER_ADDUSER_ADD_FAILURE,  
} from "./actionTypes";

const initialState = {

};

export default (state = initialState,action)  => {
  switch (action.type) {
    case "system_manager_user_add_query":
      return Object.assign({}, state, {
          page: action.payload.page,
      });
      case "system_manager_user_add_success" :
          return Object.assign({}, state, {
              userinfo: action.payload.userinfo,
          }); 
      case "system_manager_user_add_failure":
          return Object.assign({}, state, {
              error: action.payload.error
          });
    default:
      return state;
  }
};
