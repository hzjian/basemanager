import { callApi } from "../../utils/apiUtils";
import {
    TASKMANAGER_TASKSPACE_QUERY_REQUEST,TASKMANAGER_TASKSPACE_QUERY_SUCCESS,TASKMANAGER_TASKSPACE_QUERY_FAILURE,
    TASKMANAGER_TASKSPACE_KERNEL_AVALIABLE_REQUEST,TASKMANAGER_TASKSPACE_KERNEL_AVALIABLE_SUCCESS,TASKMANAGER_TASKSPACE_KERNEL_AVALIABLE_FAILURE,
    TASKMANAGER_TASKSPACE_LAYER_DELETE_REQUEST,TASKMANAGER_TASKSPACE_LAYER_DELETE_SUCCESS,TASKMANAGER_TASKSPACE_LAYER_DELETE_FAILURE,
  } from './actionTypes'

export const fetchRefLayerList = (taskId) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"taskId":taskId})
  }
  const url = "/service/user/taskref/list";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: TASKMANAGER_TASKSPACE_QUERY_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_TASKSPACE_QUERY_SUCCESS,
          payload: {
            refLayerlist: result.data,
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_TASKSPACE_QUERY_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const fetchTaskKernelAvaliable = (taskId) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"taskId":taskId})
  }
  const url = "/service/user/task/kernel/avaliable";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: TASKMANAGER_TASKSPACE_KERNEL_AVALIABLE_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_TASKSPACE_KERNEL_AVALIABLE_SUCCESS,
          payload: {
            kernellist: result.data,
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_TASKSPACE_KERNEL_AVALIABLE_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const addKernelToTask = (kernelId,taskId) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"taskId":taskId,"refClassId":kernelId})
  }
  const url = "/service/user/taskref/add";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: TASKMANAGER_TASKSPACE_KERNEL_AVALIABLE_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_TASKSPACE_KERNEL_AVALIABLE_SUCCESS,
          payload: {
            kernellist: result.data,
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_TASKSPACE_KERNEL_AVALIABLE_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const deleteTaskLayer= (layerId,taskId) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"taskId":taskId,"layerId":layerId})
  }
  const url = "/service/user/taskref/delete";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: TASKMANAGER_TASKSPACE_LAYER_DELETE_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_TASKSPACE_LAYER_DELETE_SUCCESS,
          payload: {
            kernellist: result.data,
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_TASKSPACE_LAYER_DELETE_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}