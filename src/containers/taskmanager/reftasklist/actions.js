import { callApi } from "../../utils/apiUtils";
import {
    TASKMANAGER_TASKLIST_QUERY_REQUEST,TASKMANAGER_TASKLIST_QUERY_SUCCESS,TASKMANAGER_TASKLIST_QUERY_FAILURE,
  } from './actionTypes'

export const fetchToptasks = (ikey,skey,page,pageSize,sortDirection,sortField) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"ikey":ikey,"skey":skey,"page": page,"pageSize": pageSize, "sortDirection":sortDirection ,"sortField": sortField})
  }
  const url = "/service/user/tasks";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: TASKMANAGER_TASKLIST_QUERY_REQUEST,
          payload: {
            page:page
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_TASKLIST_QUERY_SUCCESS,
          payload: {
            tasklist: result.data.content,
            totalCount: result.data.totalElements
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_TASKLIST_QUERY_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}