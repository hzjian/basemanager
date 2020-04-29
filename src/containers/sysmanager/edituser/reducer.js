/* jshint esversion: 6 */

import {
  SYSMANAGER_EDITUSER_UPDATE_REQUEST,SYSMANAGER_EDITUSER_UPDATE_SUCCESS,SYSMANAGER_EDITUSER_UPDATE_FAILURE,
} from "./actionTypes";

const initialState = {

};

export default (state = initialState,action)  => {
  switch (action.type) {
    case SYSMANAGER_EDITUSER_UPDATE_REQUEST:
      return Object.assign({}, state, {
          page: action.payload.page,
      });
     
      case SYSMANAGER_EDITUSER_UPDATE_FAILURE:
          return Object.assign({}, state, {
              error: action.payload.error
          });
    default:
      return state;
  }
};
