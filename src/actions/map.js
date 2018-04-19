import { callApi } from "../utils/apiUtils";
import {userMapByPage} from "../reducers/map";

export const SELECT_MAP_PAGE = "SELECT_MAP_PAGE";
export const INVALIDATE_MAP_PAGE = "INVALIDATE_MAP_PAGE";

export const MAP_REQUEST = "MAP_REQUEST";
export const MAP_SUCCESS = "MAP_SUCCESS";
export const MAP_FAILURE = "MAP_FAILURE";
export const DRAW_ADD_MAP = "DRAW_ADD_MAP";

export function selectMapsPage(page) {
  return {
    type: SELECT_MAP_PAGE,
    page
  };
}
//绘制完成返回信息
export function drawAddMap(payload) {
    return {
        type: DRAW_ADD_MAP,
        result: payload.data
    };
}
export function invalidateMapsPage(page) {
  return {
    type: INVALIDATE_MAP_PAGE,
    page
  };
}
function mapRequest() {
    return {
        type: MAP_REQUEST,
    };
}

// This is a curried function that takes page as argument,
// and expects payload as argument to be passed upon API call success.
function mapSuccess() {
    return function(payload) {
        return {
            type: MAP_SUCCESS,
            geojson: payload.data
        };
    };
}

// This is a curried function that takes page as argument,
// and expects error as argument to be passed upon API call failure.
function mapFailure() {
    return function(error) {
        return {
            type: MAP_FAILURE,
            error
        };
    };
}
export function fetchTopmapgeojson() {
    const config ={
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    }
    const url = "/service/busdata/testData";

    return callApi(
        url,
        config,
        mapRequest(),
        mapSuccess(),
        mapFailure()
    );
}
//绘制图形调用后台接口
export function DrawAddMap(latlngs) {
    const config ={
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    }
    const url = "/service/busdata/testData";

    return callApi(
        url,
        config,
        mapRequest(),
        drawAddMap(),
        mapFailure()
    );
}
function shouldFetchMap(state, page) {
  // Check cache first
  const map = state.userMapByPage[page];
  if (!map) {
    // Not cached, should fetch
    return true;
  }

  if (map.isFetching) {
    // Shouldn't fetch since fetching is running
    return false;
  }

  // Should fetch if cache was invalidate
  return map.didInvalidate;
}
export function fetchTopmapgeojsonIfNeeded() {
    return (dispatch, getState) => {
        return dispatch(fetchTopmapgeojson());
    };
}
