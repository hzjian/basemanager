import { callApi } from "../utils/apiUtils";

export const SELECT_GROUPS_PAGE = "SELECT_GROUPS_PAGE";
export const INVALIDATE_GROUPS_PAGE = "INVALIDATE_GROUPS_PAGE";

export const GROUPS_REQUEST = "GROUPS_REQUEST";
export const GROUPS_SUCCESS = "GROUPS_SUCCESS";
export const GROUPS_FAILURE = "GROUPS_FAILURE";

export function selectGroupsPage(page) {
  return {
    type: SELECT_GROUPS_PAGE,
    page
  };
}

export function invalidateGroupsPage(page) {
  return {
    type: INVALIDATE_GROUPS_PAGE,
    page
  };
}

function groupsRequest(page) {
  return {
    type: GROUPS_REQUEST,
    page
  };
}

function groupsSuccess(page) {
  return function(payload) {
    return {
      type: GROUPS_SUCCESS,
      page,
      groups: payload.data.content,
      totalCount: payload.data.totalElements
    };
  };
}

function groupsFailure(page) {
  return function(error) {
    return {
      type: GROUPS_FAILURE,
      page,
      error
    };
  };
}

const requestPara = {
    page:0,
    pageSize:10,
    sortField:'groupName',
    sortDirection:'DESC'
};

function fetchTopGroups(page) {
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify(requestPara),
  }
  const url = "/service/api/groups";
  return callApi(
    url,
    config,
    groupsRequest(page),
    groupsSuccess(page),
    groupsFailure(page)
  );
}

function shouldFetchGroups(state, page) {
  const groups = state.groupsByPage[page];
  if (!groups) {
    return true;
  }
  if (groups.isFetching) {
    return false;
  }
  return groups.didInvalidate;
}

export function fetchTopGroupsIfNeeded(page) {
  return (dispatch, getState) => {
    if (shouldFetchGroups(getState(), page)) {
      return dispatch(fetchTopGroups(page));
    }
  };
}
