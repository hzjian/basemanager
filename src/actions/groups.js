import { callApi } from "../utils/apiUtils";

export const SELECT_GROUPS_PAGE = "SELECT_GROUPS_PAGE";
export const INVALIDATE_GROUPS_PAGE = "INVALIDATE_GROUPS_PAGE";

export const GROUPS_REQUEST = "GROUPS_REQUEST";
export const GROUPS_SUCCESS = "GROUPS_SUCCESS";
export const GROUPS_FAILURE = "GROUPS_FAILURE";

export const SAVE_GROUPS_INFO = "SAVE_GROUPS_INFO";
export const EDIT_GROUPS_INFO = "EDIT_GROUPS_INFO";
export const CLOSE_GROUPS_INFO = "CLOSE_GROUPS_INFO";

export const GROUP_INFO_POST = "GROUP_INFO_POST";
export const GROUP_INFO_SUCCESS = "GROUP_INFO_SUCCESS";
export const GROUP_INFO_FAILURE = "GROUP_INFO_FAILURE";


export function editGroupsInfo(group) {
  return {
    type: EDIT_GROUPS_INFO,
    payload: group,
    isShowingModal: true
  };
}

export function saveGroupInfo(group) {
  return (dispatch, getState) => {
      return dispatch(saveGroupCallApi(group));

  };
}

export function closeGroupInfoDialog()
{
  return {
    type: CLOSE_GROUPS_INFO,
    payload: {},
    isShowingModal: false
  };
}


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

function groupInfoPost() {
  return {
    type: GROUP_INFO_POST,
  };
}

function groupInfoPostSuccess() {
  return function(result) {
    return {
      type: GROUP_INFO_SUCCESS,
      payload: result.data,
    };
  };
}

function groupInfoPostFailure() {
  return function(error) {
    return {
      type: GROUP_INFO_FAILURE,
      payload: error
    };
  };
}
function saveGroupCallApi(group) {
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify(group),
  }
  const url = "/service/api/group/update";
  return callApi(
    url,
    config,
    groupInfoPost(),
    groupInfoPostSuccess(),
    groupInfoPostFailure()
  );
}


const fetchGrpRequestPara = {
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
    body: JSON.stringify(fetchGrpRequestPara),
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
