import {
  SELECT_GROUPS_PAGE,
  INVALIDATE_GROUPS_PAGE,
  GROUPS_REQUEST,
  GROUPS_SUCCESS,
  GROUPS_FAILURE
} from "../actions/groups";

export function selectedGroupsPage(state = 1, action) {
  switch (action.type) {
    case SELECT_GROUPS_PAGE:
      return action.page;
    default:
      return state;
  }
}

function groups(
  state = {
    isFetching: false,
    didInvalidate: false,
    totalCount: 0,
    groups: [],
    error: null
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_GROUPS_PAGE:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case GROUPS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case GROUPS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        totalCount: action.totalCount,
        groups: action.groups,
        error: null
      });
    case GROUPS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        error: action.error
      });
    default:
      return state;
  }
}

export function groupsByPage(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_GROUPS_PAGE:
    case GROUPS_REQUEST:
    case GROUPS_SUCCESS:
    case GROUPS_FAILURE:
      return Object.assign({}, state, {
        [action.page]: groups(state[action.page], action)
      });
    default:
      return state;
  }
}
