/* jshint esversion: 6 */

import {
  GROUPMANAGER_DICT_EDIT_REQUEST,GROUPMANAGER_DICT_EDIT_SUCCESS,GROUPMANAGER_DICT_EDIT_FAILURE,
} from "./actionTypes";

const initialState = {

};

export default (state = initialState,action)  => {
  switch (action.type) {
    case GROUPMANAGER_DICT_EDIT_REQUEST:
      return Object.assign({}, state, {
          page: action.payload.page,
      });
      case GROUPMANAGER_DICT_EDIT_SUCCESS:
          return Object.assign({}, state, {
              fieldlist: action.payload.fieldlist,
              totalCount: action.payload.totalCount
          });
      case GROUPMANAGER_DICT_EDIT_FAILURE:
          return Object.assign({}, state, {
              error: action.payload.error
          });
    default:
      return state;
  }
};
