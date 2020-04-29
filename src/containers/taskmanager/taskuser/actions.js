import { callApi } from "../../utils/apiUtils";
import {
    TASKMANAGER_TASKUSER_QUERY_REQUEST,TASKMANAGER_TASKUSER_QUERY_SUCCESS,TASKMANAGER_TASKUSER_QUERY_FAILURE,
    TASKMANAGER_TASKUSER_USER_AVALIABLE_REQUEST,TASKMANAGER_TASKUSER_USER_AVALIABLE_SUCCESS,TASKMANAGER_TASKUSER_USER_AVALIABLE_FAILURE,
    TASKMANAGER_TASKUSER_USER_DELETE_REQUEST,TASKMANAGER_TASKUSER_USER_DELETE_SUCCESS,TASKMANAGER_TASKUSER_USER_DELETE_FAILURE,
    TASKMANAGER_TASKUSER_ADD_USER_REQUEST,TASKMANAGER_TASKUSER_ADD_USER_SUCCESS,TASKMANAGER_TASKUSER_ADD_USER_FAILURE,
  } from './actionTypes'

export const fetchTaskUserList = (taskId,skey,page,pageSize) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"taskId":taskId,"skey":skey,"page": page,"pageSize": pageSize})
  }
  const url = "/service/user/taskuser/list";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: TASKMANAGER_TASKUSER_QUERY_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_TASKUSER_QUERY_SUCCESS,
          payload: {
            taskuserlist: result.data.content,
            totalCount: result.data.totalElements,
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_TASKUSER_QUERY_FAILURE,
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
          type: TASKMANAGER_TASKUSER_USER_AVALIABLE_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_TASKUSER_USER_AVALIABLE_SUCCESS,
          payload: {
            avuserlist: result.data,
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_TASKUSER_USER_AVALIABLE_FAILURE,
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
          type: TASKMANAGER_TASKUSER_ADD_USER_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_TASKUSER_ADD_USER_SUCCESS,
          payload: {
            userId: result.data.userName,
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_TASKUSER_ADD_USER_FAILURE,
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
          type: TASKMANAGER_TASKUSER_USER_DELETE_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_TASKUSER_USER_DELETE_SUCCESS,
          payload: {
            kernellist: result.data,
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_TASKUSER_USER_DELETE_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}