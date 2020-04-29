/* jshint esversion: 6 */

import {
  GROUPMANAGER_ADDDICT_ADD_REQUEST,GROUPMANAGER_ADDDICT_ADD_SUCCESS,GROUPMANAGER_ADDDICT_ADD_FAILURE, 
} from "./actionTypes";

const initialState = {

};

export default (state = initialState,action)  => {
  switch (action.type) {
    case GROUPMANAGER_ADDDICT_ADD_REQUEST:
      return Object.assign({}, state, {
          page: action.payload.page,
      });
      case GROUPMANAGER_ADDDICT_ADD_SUCCESS:
          return Object.assign({}, state, {
              fieldlist: action.payload.fieldlist,
              totalCount: action.payload.totalCount
          });
    default:
      return state;
  }
};
