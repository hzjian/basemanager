import {  callApi } from "../../utils/apiUtils";
import { 
        TASKMANAGER_CREATETASK_CREATE_REQUEST,TASKMANAGER_CREATETASK_CREATE_SUCCESS,TASKMANAGER_CREATETASK_CREATE_FAILURE,
        TASKMANAGER_CREATETASK_KERNELS_REQUEST,TASKMANAGER_CREATETASK_KERNELS_SUCCESS,TASKMANAGER_CREATETASK_KERNELS_FAILURE,
        } from  './actionTypes';

        
export const loadKernelList = (taskparam) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      /**
        page 
        pageSize
        sortDirection
        sortField
        skey
        */
      body: JSON.stringify({"page":0,"pageSize":999})
  }
  const url = "/service/user/kernels";

  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
            type: TASKMANAGER_CREATETASK_KERNELS_REQUEST,
            payload: {
            }
        };
      },
      (result) => {
        return {
            type: TASKMANAGER_CREATETASK_KERNELS_SUCCESS,
            payload: {
              kernels:result.data.content,
              totalCount: result.data.totalElements
            }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_CREATETASK_KERNELS_FAILURE,
            error
        };
      }
  ));
}     


export const createNewTask = (taskparam) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      /**
       *  taskName
          taskDesc
          startTime
          terminalTime
          busPassword
          classId
          extId
        */
      body: JSON.stringify({"taskName":taskparam.taskName,
      "taskDesc":taskparam.taskDesc,
      "startTime":taskparam.startTime,
      "terminalTime":taskparam.terminalTime,
      "busPassword":taskparam.busPassword,
      "classId":taskparam.kernelId,})
  }
  const url = "/service/user/task/save";

  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
            type: TASKMANAGER_CREATETASK_CREATE_REQUEST,
            payload: {
            }
        };
      },
      (result) => {
        return {
            type: TASKMANAGER_CREATETASK_CREATE_SUCCESS,
            payload: {
              
            }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_CREATETASK_CREATE_FAILURE,
            error
        };
      }
  ));
}