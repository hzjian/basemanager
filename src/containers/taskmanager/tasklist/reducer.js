/* jshint esversion: 6 */

import {
  TASKMANAGER_TASKLIST_QUERY_REQUEST,TASKMANAGER_TASKLIST_QUERY_SUCCESS,TASKMANAGER_TASKLIST_QUERY_FAILURE,
} from "./actionTypes";

const initialState = {
  tasklist:[],
  totalCount:0,
  page:0
};

export default (state = initialState,action)  => {
  switch (action.type) {
    case TASKMANAGER_TASKLIST_QUERY_REQUEST:
      return Object.assign({}, state, {
          page: action.payload.page,
      });
      case TASKMANAGER_TASKLIST_QUERY_SUCCESS:
          return Object.assign({}, state, {
              tasklist: action.payload.tasklist,
              totalCount: action.payload.totalCount
          });
      case TASKMANAGER_TASKLIST_QUERY_FAILURE:
          return Object.assign({}, state, {
              error: action.payload.error
          });
    default:
      return state;
  }
};
