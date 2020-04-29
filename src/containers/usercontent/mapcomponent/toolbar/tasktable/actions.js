import { callApi } from '../../../../utils/apiUtils';
import {
  CONTENT_MAP_TASK_QUERY_TASKLIST_REQUEST,CONTENT_MAP_TASK_QUERY_TASKLIST_SUCCESS,CONTENT_MAP_TASK_QUERY_TASKLIST_FAILURE,
  CONTENT_MAP_TASK_OPEN_TASK_REQUEST,CONTENT_MAP_TASK_OPEN_TASK_SUCCESS,CONTENT_MAP_TASK_OPEN_TASK_FAILURE,
  CONTENT_MAP_TASK_CLOSE_TASK_REQUEST
} from '../../../actionTypes';

export const getUserTaskList = (skey,ikey) => dispatch => {
    const config ={
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({"skey":skey,"ikey":ikey})
    }
    const url = "/service/user/tasks";
  
    return dispatch(callApi(
        url,
        config,
        () =>{
          return {
              type: CONTENT_MAP_TASK_QUERY_TASKLIST_REQUEST,
              payload: {
              }
          };
        },
        (result) => {
          return {
              type: CONTENT_MAP_TASK_QUERY_TASKLIST_SUCCESS,
              payload: {
                taskList: result.data,
                totalCount: result.data.length
              }
          };
        },
        (error) => {
          return {
              type: CONTENT_MAP_TASK_QUERY_TASKLIST_FAILURE,
              error
          };
        }
    ));
  }

  export const openUserTask = (taskId) => dispatch => {
    const config ={
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({"taskId":taskId})
    }
    const url = "/service/user/task/layerinfo";
    return dispatch(callApi(
        url,
        config,
        () =>{
          return {
              type: CONTENT_MAP_TASK_OPEN_TASK_REQUEST,
              payload: {
              }
          };
        },
        (result) => {
          return {
              type: CONTENT_MAP_TASK_OPEN_TASK_SUCCESS,
              payload: {
                layerList: result.data,
                taskId: taskId
              }
          };
        },
        (error) => {
          return {
              type: CONTENT_MAP_TASK_OPEN_TASK_FAILURE,
              error
          };
        }
    ));
  }

  export const closeUserTask = (taskId) =>{
      return {
        type: CONTENT_MAP_TASK_CLOSE_TASK_REQUEST,
        payload: {
          taskId: null,
          layerList: null
        }
      }
  }