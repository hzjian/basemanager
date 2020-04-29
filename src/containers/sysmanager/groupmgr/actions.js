import { callApi } from "../../utils/apiUtils";
import {
    SYSMANAGER_GROUPMGR_QUERY_REQUEST,SYSMANAGER_GROUPMGR_QUERY_SUCCESS,SYSMANAGER_GROUPMGR_QUERY_FAILURE,
    SYSMANAGER_GROUPMGR_USER_AVALIABLE_REQUEST,SYSMANAGER_GROUPMGR_USER_AVALIABLE_SUCCESS,SYSMANAGER_GROUPMGR_USER_AVALIABLE_FAILURE,
    SYSMANAGER_GROUPMGR_USER_DELETE_REQUEST,SYSMANAGER_GROUPMGR_USER_DELETE_SUCCESS,SYSMANAGER_GROUPMGR_USER_DELETE_FAILURE,
    SYSMANAGER_GROUPMGR_ADD_USER_REQUEST,SYSMANAGER_GROUPMGR_ADD_USER_SUCCESS,SYSMANAGER_GROUPMGR_ADD_USER_FAILURE,
  } from './actionTypes'

export const fetchGroupList = (skey,page,pageSize,sortDirection,sortField) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"skey":skey,"page": page,"pageSize": pageSize,"sortDirection":sortDirection ,"sortField": sortField})
  }
  const url = "/service/api/groups";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: SYSMANAGER_GROUPMGR_QUERY_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: SYSMANAGER_GROUPMGR_QUERY_SUCCESS,
          payload: {
            grouplist: result.data.content,
            totalCount: result.data.totalElements,
          }
        };
      },
      (error) => {
        return {
            type: SYSMANAGER_GROUPMGR_QUERY_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const fetchTaskUserAvaliable = (taskId) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"taskId":taskId})
  }
  const url = "/service/user/task/user/avaliable";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: SYSMANAGER_GROUPMGR_USER_AVALIABLE_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: SYSMANAGER_GROUPMGR_USER_AVALIABLE_SUCCESS,
          payload: {
            avuserlist: result.data,
          }
        };
      },
      (error) => {
        return {
            type: SYSMANAGER_GROUPMGR_USER_AVALIABLE_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const addUserToTask = (userId,taskId) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"taskId":taskId,"userName":userId})
  }
  const url = "/service/user/taskuser/add";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: SYSMANAGER_GROUPMGR_ADD_USER_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: SYSMANAGER_GROUPMGR_ADD_USER_SUCCESS,
          payload: {
            userId: result.data.userName,
          }
        };
      },
      (error) => {
        return {
            type: SYSMANAGER_GROUPMGR_ADD_USER_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const deleteTaskUser= (userId,taskId) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"taskId":taskId,"userName":userId})
  }
  const url = "/service/user/taskuser/delete";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: SYSMANAGER_GROUPMGR_USER_DELETE_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: SYSMANAGER_GROUPMGR_USER_DELETE_SUCCESS,
          payload: {
            kernellist: result.data,
          }
        };
      },
      (error) => {
        return {
            type: SYSMANAGER_GROUPMGR_USER_DELETE_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}