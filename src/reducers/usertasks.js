import {
  SELECT_TASKS_PAGE,
  INVALIDATE_TASKS_PAGE,
  TASKS_REQUEST,
  TASKS_SUCCESS,
  TASKS_FAILURE
} from "../actions/usertask";

export function selectedUserTasksPage(state = 1, action) {
  switch (action.type) {
    case SELECT_TASKS_PAGE:
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
    case INVALIDATE_TASKS_PAGE:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case TASKS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case TASKS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        totalCount: action.totalCount,
        tasks: action.tasks,
        error: null
      });
    case TASKS_FAILURE:
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
    case INVALIDATE_TASKS_PAGE:
    case TASKS_REQUEST:
    case TASKS_SUCCESS:
    case TASKS_FAILURE:
      return Object.assign({}, state, {
        [action.page]: userTasks(state[action.page], action)
      });
    default:
      return state;
  }
}
