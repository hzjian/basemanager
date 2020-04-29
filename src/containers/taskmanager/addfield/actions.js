import { callApi } from "../../utils/apiUtils";
import {
    TASKMANAGER_TASKFIELD_ADD_REQUEST,TASKMANAGER_TASKFIELD_ADD_SUCCESS,TASKMANAGER_TASKFIELD_ADD_FAILURE,
  } from './actionTypes'

export const addTaskField = (classId,taskId,params) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"classId":classId,"taskId":taskId,"attrName": params.fieldName, "attrType":params.fieldType, "attrGrade":params.fieldGrade,"attrDesc":params.fieldDesc})
  }
  const url = "/service/user/kernel/addattr";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: TASKMANAGER_TASKFIELD_ADD_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_TASKFIELD_ADD_SUCCESS,
          payload: {
            fieldlist: result.data.content,
            totalCount: result.data.totalElements
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_TASKFIELD_ADD_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}
