import { callApi } from "../../utils/apiUtils";
import {
    GROUPMANAGER_KERNELFIELD_QUERY_REQUEST,GROUPMANAGER_KERNELFIELD_QUERY_SUCCESS,GROUPMANAGER_KERNELFIELD_QUERY_FAILURE,
    GROUPMANAGER_KERNELFIELD_ADD_EXIST_REQUEST,GROUPMANAGER_KERNELFIELD_ADD_EXIST_SUCCESS,GROUPMANAGER_KERNELFIELD_ADD_EXIST_FAILURE,
    GROUPMANAGER_KERNELFIELD_DELETE_REQUEST,GROUPMANAGER_KERNELFIELD_DELETE_SUCCESS,GROUPMANAGER_KERNELFIELD_DELETE_FAILURE,
    GROUPMANAGER_KERNELFIELD_RANK_UPDATE_REQUEST,GROUPMANAGER_KERNELFIELD_RANK_UPDATE_SUCCESS,GROUPMANAGER_KERNELFIELD_RANK_UPDATE_FAILURE,
  } from './actionTypes'

export const fetchFieldList = (kernelId,page,pageSize,sortDirection,sortField) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"classId":kernelId,"page": page,"pageSize": pageSize, "sortDirection":sortDirection ,"sortField": sortField})
  }
  const url = "/service/user/kernel/attrs";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: GROUPMANAGER_KERNELFIELD_QUERY_REQUEST,
          payload: {
            page:page
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_KERNELFIELD_QUERY_SUCCESS,
          payload: {
            fieldlist: result.data.content,
            totalCount: result.data.totalElements
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_KERNELFIELD_QUERY_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}


export const addAttrToTask = (attrId,taskId) => dispatch => {
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"attrId":attrId , "taskId":taskId,"isEdit":0 })
  }
  const url = "/service/user/taskattr/addexist";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: GROUPMANAGER_KERNELFIELD_ADD_EXIST_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_KERNELFIELD_ADD_EXIST_SUCCESS,
          payload: {
            addField: result.data,
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_KERNELFIELD_ADD_EXIST_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const deleteKernelAttr = (attrId,classId) => dispatch => {
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"attrId":attrId , "classId":classId})
  }
  const url = "/service/user/kernel/deleteattr";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: GROUPMANAGER_KERNELFIELD_DELETE_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_KERNELFIELD_DELETE_SUCCESS,
          payload: {
            deleteField: result.data,
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_KERNELFIELD_DELETE_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const saveTaskAttrStatus = (taskId,attrId,editstate) => dispatch => {
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"attrId":attrId , "taskId":taskId,"isEdit":editstate})
  }
  const url = "/service/user/taskattr/update";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: GROUPMANAGER_KERNELFIELD_RANK_UPDATE_REQUEST,
          payload: {
          }
        };
      },
      () => {
        return {
          type: GROUPMANAGER_KERNELFIELD_RANK_UPDATE_SUCCESS,
          payload: {
            attrId:attrId,
            isEdit:editstate,
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_KERNELFIELD_RANK_UPDATE_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}
