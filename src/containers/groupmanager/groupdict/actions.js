import { callApi } from "../../utils/apiUtils";
import {
    GROUPMANAGER_DICT_QUERY_REQUEST,GROUPMANAGER_DICT_QUERY_SUCCESS,GROUPMANAGER_DICT_QUERY_FAILURE,
    GROUPMANAGER_DICT_USER_AVALIABLE_REQUEST,GROUPMANAGER_DICT_USER_AVALIABLE_SUCCESS,GROUPMANAGER_DICT_USER_AVALIABLE_FAILURE,
    GROUPMANAGER_DICT_USER_DELETE_REQUEST,GROUPMANAGER_DICT_USER_DELETE_SUCCESS,GROUPMANAGER_DICT_USER_DELETE_FAILURE,
    GROUPMANAGER_DICT_ADD_USER_REQUEST,GROUPMANAGER_DICT_ADD_USER_SUCCESS,GROUPMANAGER_DICT_ADD_USER_FAILURE,
  } from './actionTypes'

export const fetchDictList = (skey,page,pageSize,sortDirection,sortField) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"skey":skey,"page": page,"pageSize": pageSize,"sortDirection":sortDirection ,"sortField": sortField})
  }
  const url = "/service/common/dicts";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: GROUPMANAGER_DICT_QUERY_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_DICT_QUERY_SUCCESS,
          payload: {
            dictlist: result.data.content,
            totalCount: result.data.totalElements,
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_DICT_QUERY_FAILURE,
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
          type: GROUPMANAGER_DICT_USER_AVALIABLE_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_DICT_USER_AVALIABLE_SUCCESS,
          payload: {
            avuserlist: result.data,
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_DICT_USER_AVALIABLE_FAILURE,
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
          type: GROUPMANAGER_DICT_ADD_USER_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_DICT_ADD_USER_SUCCESS,
          payload: {
            userId: result.data.userName,
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_DICT_ADD_USER_FAILURE,
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
          type: GROUPMANAGER_DICT_USER_DELETE_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_DICT_USER_DELETE_SUCCESS,
          payload: {
            kernellist: result.data,
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_DICT_USER_DELETE_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}