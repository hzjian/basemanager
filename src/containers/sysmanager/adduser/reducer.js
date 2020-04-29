/* jshint esversion: 6 */

import {
  SYSMANAGER_ADDUSER_ADD_REQUEST,SYSMANAGER_ADDUSER_ADD_SUCCESS,SYSMANAGER_ADDUSER_ADD_FAILURE,  
} from "./actionTypes";

const initialState = {

};

export default (state = initialState,action)  => {
  switch (action.type) {
    case SYSMANAGER_ADDUSER_ADD_REQUEST:
      return Object.assign({}, state, {
          page: action.payload.page,
      });
      case SYSMANAGER_ADDUSER_ADD_SUCCESS:
          return Object.assign({}, state, {
              userinfo: action.payload.userinfo,
          }); 
      case SYSMANAGER_ADDUSER_ADD_FAILURE:
          return Object.assign({}, state, {
              error: action.payload.error
          });
    default:
      return state;
  }
};
