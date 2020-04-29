import {  callApi } from "../../utils/apiUtils";
import { 
        TASKMANAGER_QUERYTASK_TASKINFO_REQUEST,TASKMANAGER_QUERYTASK_TASKINFO_SUCCESS,TASKMANAGER_QUERYTASK_TASKINFO_FAILURE,
        TASKMANAGER_MODIFYTASK_UPDATE_REQUEST,TASKMANAGER_MODIFYTASK_UPDATE_SUCCESS,TASKMANAGER_MODIFYTASK_UPDATE_FAILURE,
        } from  './actionTypes';

export const loadTaskInfo = (taskId) => dispatch => {
        const config ={
                method: 'POST',
                headers: {
                "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({"id":taskId})
        }
        const url = "/service/user/task";

        return dispatch(callApi(
                url,
                config,
                () =>{
                return {
                        type: TASKMANAGER_QUERYTASK_TASKINFO_REQUEST,
                        payload: {
                        }
                };
                },
                (result) => {
                return {
                        type: TASKMANAGER_QUERYTASK_TASKINFO_SUCCESS,
                        payload: {
                                taskInfo :result.data,
                        }
                };
                },
                (error) => {
                return {
                        type: TASKMANAGER_QUERYTASK_TASKINFO_FAILURE,
                        error
                };
                }
        ));
}    



export const saveTaskInfo = (taskparam) => dispatch => {
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
            "taskId":taskparam.taskId,})
        }
        const url = "/service/user/task/update";
      
        return dispatch(callApi(
            url,
            config,
            () =>{
              return {
                  type: TASKMANAGER_MODIFYTASK_UPDATE_REQUEST,
                  payload: {
                  }
              };
            },
            (result) => {
              return {
                  type: TASKMANAGER_MODIFYTASK_UPDATE_SUCCESS,
                  payload: {
                    
                  }
              };
            },
            (error) => {
              return {
                  type: TASKMANAGER_MODIFYTASK_UPDATE_FAILURE,
                  error
              };
            }
        ));
      }