/* jshint esversion: 6 */

import * as actions from "./actionTypes";

export function selectedUserTasksPage(state = 1, action) {
  switch (action.type) {
    case actions.SELECT_TASKS_PAGE:
      return action.page;
    default:
      return state;
  }
}

function userTasks(
  state = {
    isFetching: false,
    didInvalidate: false,
    totalCount: 0,
    tasks: [],
    error: null
  },
  action
) {
  switch (action.type) {
    case actions.INVALIDATE_TASKS_PAGE:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case actions.TASKS_REQUEST:
      return Object.assign({}, state, {
          isFetching: true,
          didInvalidate: false
      });
      case actions.TASKS_SUCCESS:
          return Object.assign({}, state, {
              isFetching: false,
              didInvalidate: false,
              totalCount: action.totalCount,
              tasks: action.tasks,
              error: null
          });
      case actions.TASKS_FAILURE:
          return Object.assign({}, state, {
              isFetching: false,
              didInvalidate: false,
              error: action.error
          });
    default:
      return state;
  }
}

export function userTasksByPage(state = {}, action) {
  switch (action.type) {
    case actions.INVALIDATE_TASKS_PAGE:
    case actions.TASKS_REQUEST:
    case actions.TASKS_SUCCESS:
    case actions.TASKS_FAILURE:
      return Object.assign({}, state, {
        [action.page]: userTasks(state[action.page], action)
      });
    default:
      return state;
  }
}
