import { callApi } from "../../utils/apiUtils";
import {
    TASKMANAGER_REFLAYERFIELD_QUERY_REQUEST,TASKMANAGER_REFLAYERFIELD_QUERY_SUCCESS,TASKMANAGER_REFLAYERFIELD_QUERY_FAILURE,
    TASKMANAGER_REFLAYERFIELD_AVALIABLE_QUERY_REQUEST,TASKMANAGER_REFLAYERFIELD_AVALIABLE_QUERY_SUCCESS,TASKMANAGER_REFLAYERFIELD_AVALIABLE_QUERY_FAILURE,
    TASKMANAGER_REFLAYERFIELD_ADD_EXIST_REQUEST,TASKMANAGER_REFLAYERFIELD_ADD_EXIST_SUCCESS,TASKMANAGER_REFLAYERFIELD_ADD_EXIST_FAILURE,
    TASKMANAGER_REFLAYERFIELD_DELETE_REQUEST,TASKMANAGER_REFLAYERFIELD_DELETE_SUCCESS,TASKMANAGER_REFLAYERFIELD_DELETE_FAILURE,
  } from './actionTypes'

export const fetchFieldList = (taskId,layerId,page,pageSize,sortDirection,sortField) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"layerId":layerId,"taskId":taskId,"page": page,"pageSize": pageSize, "sortDirection":sortDirection ,"sortField": sortField})
  }
  const url = "/service/user/taskattr/list";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: TASKMANAGER_REFLAYERFIELD_QUERY_REQUEST,
          payload: {
            page:page
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_REFLAYERFIELD_QUERY_SUCCESS,
          payload: {
            fieldlist: result.data.content,
            totalCount: result.data.totalElements
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_REFLAYERFIELD_QUERY_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}

//service/user/task/attr/avaliable
export const fetchTaskAttrAvaliable = (taskId,classId) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"taskId":taskId ,"classId":classId})
  }
  const url = "/service/user/task/attr/avaliable";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: TASKMANAGER_REFLAYERFIELD_AVALIABLE_QUERY_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_REFLAYERFIELD_AVALIABLE_QUERY_SUCCESS,
          payload: {
            attrList: result.data,
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_REFLAYERFIELD_AVALIABLE_QUERY_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const addAttrToTask = (attrId,taskId,classId) => dispatch => {
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"attrId":attrId , "taskId":taskId })
  }
  const url = "/service/user/taskref/addattr";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: TASKMANAGER_REFLAYERFIELD_ADD_EXIST_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_REFLAYERFIELD_ADD_EXIST_SUCCESS,
          payload: {
            addField: result.data,
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_REFLAYERFIELD_ADD_EXIST_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const deleteTaskAttr = (attrId,taskId,classId) => dispatch => {
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"attrId":attrId , "taskId":taskId})
  }
  const url = "/service/user/taskattr/delete";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: TASKMANAGER_REFLAYERFIELD_DELETE_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_REFLAYERFIELD_DELETE_SUCCESS,
          payload: {
            deleteField: result.data,
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_REFLAYERFIELD_DELETE_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}