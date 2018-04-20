import { callApi } from "../../../utils/apiUtils";
import {  notification } from 'antd'; 

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
export const GROUP_DELETE_SUCCESS ="GROUP_DELETE_SUCCESS";
export const NEW_GROUPS_INFO = "NEW_GROUPS_INFO";
export const ADD_GROUP_SUCCESS = "ADD_GROUP_SUCCESS";

export function editGroupsInfo(group) {
  return {
    type: EDIT_GROUPS_INFO,
    payload: {
      group: group,
      isnewgroup: false,
      isShowingModal: true
    }
  };
}

export const addNewGroup = () => {
  return {
    type: NEW_GROUPS_INFO,
    payload: {
      isnewgroup: true,
      isShowingModal: true
    }
  };
}

function groupAddSuccess() {
  return function(result) {
    return {
      type: ADD_GROUP_SUCCESS,
      payload:{
         newgroup: result.data,
      }
    };
  };
}

export const newGroupInfo = (group) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify(group)
  }
  dispatch(callApi(
    "/service/api/group/add",
    config,
    groupsRequest(),
    groupAddSuccess(),
    groupsFailure()
  ));

}

function groupDeleteSuccess() {
  return function(result) {
    return {
      type: GROUP_DELETE_SUCCESS,
      payload:{
         delGroupGuid: result.data,
      }
    };
  };
}

export const deleteGroup = (group) =>(dispatch) =>{
  if(group)
  {
    const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({groupGuid: group.groupGuid}),
    }
    dispatch(callApi(
      "/service/api/group/delete",
      config,
      groupsRequest(),
      groupDeleteSuccess(),
      groupsFailure()
    ));
  }
}

function groupInfoPostSuccess() {
  return function(result) {
    return {
      type: GROUP_INFO_SUCCESS,
      payload:{
         groups: result.data,
         totalCount: result.totalCount
      }
    };
  };
}

export const saveGroupInfo = (group) => (dispatch,getState) => {
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify(group),
  }
  dispatch(callApi(
    "/service/api/group/update",
    config,
    groupsRequest(),
    groupInfoPostSuccess(),
    groupsFailure()
  ));
}

export function closeDialog(group)
{
  return {
    type: CLOSE_GROUPS_INFO,
    payload: {
      isShowingModal: false,
      group:group
    }
  };
}


export function selectGroupsPage(page) {
  return {
    type: SELECT_GROUPS_PAGE,
    payload: {
      page: page
    }
  };
}

export function invalidateGroupsPage(page) {
  return {
    type: INVALIDATE_GROUPS_PAGE,
    payload: {
      page: page
    }
  };
}

function groupsRequest() {
  return {
    type: GROUPS_REQUEST,
    payload: {
      isFetching: true
    }
  };
}

function groupsSuccess(page) {
  return function(result) {
    return {
      type: GROUPS_SUCCESS,
      payload: {
        page: page,
        groups: result.data.content,
        totalCount: result.data.totalElements
      }
    };
  };
}

function groupsFailure() {
  return function(error) {
    return {
      type: GROUPS_FAILURE,
      payload: {
        error:error
      }
    };
  };
}

const fetchTopGroups = (page) => dispatch => {
  const requestPara = {
    page:0,
    pageSize:10,
    sortField:'groupName',
    sortDirection:'DESC'
  };
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify(requestPara),
  }
  dispatch(callApi(
    "/service/api/groups",
    config,
    groupsRequest(),
    groupsSuccess(page),
    groupsFailure()
  ));
}

function shouldFetchGroups(state, page) {
  const groupdata = state.groupform;
  if (groupdata.isFetching) {
    return false;
  }
  return true;
}

export const fetchTopGroupsIfNeeded = (page) => (dispatch,getState) =>{
  if (shouldFetchGroups(getState(), page)) {
    return dispatch(fetchTopGroups(page));
  }
}
