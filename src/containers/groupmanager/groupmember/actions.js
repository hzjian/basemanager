import { callApi } from "../../utils/apiUtils";
import {
    GROUPMANAGER_GROUPMEMBER_QUERY_REQUEST,GROUPMANAGER_GROUPMEMBER_QUERY_SUCCESS,GROUPMANAGER_GROUPMEMBER_QUERY_FAILURE,
    GROUPMANAGER_GROUPMEMBER_USER_DELETE_REQUEST,GROUPMANAGER_GROUPMEMBER_USER_DELETE_SUCCESS,GROUPMANAGER_GROUPMEMBER_USER_DELETE_FAILURE,
    GROUPMANAGER_GROUPMEMBER_ADD_USER_REQUEST,GROUPMANAGER_GROUPMEMBER_ADD_USER_SUCCESS,GROUPMANAGER_GROUPMEMBER_ADD_USER_FAILURE,
  } from './actionTypes'

export const fetchGroupUserList = (skey,page,pageSize) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"skey":skey,"page": page,"pageSize": pageSize})
  }
  const url = "/service/group/members";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: GROUPMANAGER_GROUPMEMBER_QUERY_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_GROUPMEMBER_QUERY_SUCCESS,
          payload: {
            memberlist: result.data.content,
            totalCount: result.data.totalElements,
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_GROUPMEMBER_QUERY_FAILURE,
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
          type: GROUPMANAGER_GROUPMEMBER_ADD_USER_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_GROUPMEMBER_ADD_USER_SUCCESS,
          payload: {
            userId: result.data.userName,
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_GROUPMEMBER_ADD_USER_FAILURE,
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
          type: GROUPMANAGER_GROUPMEMBER_USER_DELETE_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_GROUPMEMBER_USER_DELETE_SUCCESS,
          payload: {
            userName: result.data,
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_GROUPMEMBER_USER_DELETE_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}