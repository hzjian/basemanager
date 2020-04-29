import { callApi } from "../../utils/apiUtils";
import {
    SYSMANAGER_GROUPUSER_QUERY_REQUEST,SYSMANAGER_GROUPUSER_QUERY_SUCCESS,SYSMANAGER_GROUPUSER_QUERY_FAILURE,
    SYSMANAGER_GROUPUSER_USER_DELETE_REQUEST,SYSMANAGER_GROUPUSER_USER_DELETE_SUCCESS,SYSMANAGER_GROUPUSER_USER_DELETE_FAILURE,
    SYSMANAGER_GROUPUSER_ADD_USER_REQUEST,SYSMANAGER_GROUPUSER_ADD_USER_SUCCESS,SYSMANAGER_GROUPUSER_ADD_USER_FAILURE,
  } from './actionTypes'

export const fetchGroupUserList = (groupId,skey,page,pageSize) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"groupId":groupId,"skey":skey,"page": page,"pageSize": pageSize})
  }
  const url = "/service/api/users";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: SYSMANAGER_GROUPUSER_QUERY_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: SYSMANAGER_GROUPUSER_QUERY_SUCCESS,
          payload: {
            groupuserlist: result.data.content,
            totalCount: result.data.totalElements,
          }
        };
      },
      (error) => {
        return {
            type: SYSMANAGER_GROUPUSER_QUERY_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}


export const addUserToGroup = (userId,groupId) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"groupId":groupId,"userName":userId})
  }
  const url = "/service/api/user/save";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: SYSMANAGER_GROUPUSER_ADD_USER_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: SYSMANAGER_GROUPUSER_ADD_USER_SUCCESS,
          payload: {
            userId: result.data.userName,
          }
        };
      },
      (error) => {
        return {
            type: SYSMANAGER_GROUPUSER_ADD_USER_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const deleteGroupUser= (userId,groupId) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"groupId":groupId,"userName":userId})
  }
  const url = "/service/api/user/delete";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: SYSMANAGER_GROUPUSER_USER_DELETE_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: SYSMANAGER_GROUPUSER_USER_DELETE_SUCCESS,
          payload: {
            userName: result.data,
          }
        };
      },
      (error) => {
        return {
            type: SYSMANAGER_GROUPUSER_USER_DELETE_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}