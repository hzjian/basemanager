import {
  SELECT_MAP_PAGE,
  INVALIDATE_MAP_PAGE,
    DRAW_ADD_MAP,
    MAP_REQUEST,
    MAP_SUCCESS,
    MAP_FAILURE
} from "../actions/map";

export function selectedUserMapPage(state = 1, action) {
  switch (action.type) {
    case SELECT_MAP_PAGE:
      return action.geojson;
      case DRAW_ADD_MAP:
          return action.drawdata;
    default:
      return state;
  }
}
export function drawAddMap(state = 1, action) {
    switch (action.type) {
        case DRAW_ADD_MAP:
            return action.drawdata;
        default:
            return state;
    }
}
function userMap(
  state = {
    isFetching: false,
    didInvalidate: false,
    totalCount: 0,
    geojson: [],
    error: null
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_MAP_PAGE:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case MAP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case MAP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        totalCount: action.totalCount,
          geojson: action.geojson,
        error: null
      });
      case DRAW_ADD_MAP:
          return Object.assign({}, state, {
              isFetching: false,
              didInvalidate: false,
              drawdata:action.drawdata,
              error: null
          });
    case MAP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        error: action.error
      });
    default:
      return state;
  }
}

export function userMapByPage(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_MAP_PAGE:
    case MAP_REQUEST:
    case MAP_SUCCESS:
    case MAP_FAILURE:
      return Object.assign({}, state, {
        geojson: action.geojson
      });
    default:
      return state;
  }
}
