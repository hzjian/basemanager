import { callApi } from "../../utils/apiUtils";
import {
    GROUPMANAGER_ADDFIELD_ADD_REQUEST,GROUPMANAGER_ADDFIELD_ADD_SUCCESS,GROUPMANAGER_ADDFIELD_ADD_FAILURE,
  } from './actionTypes'

export const addTaskField = (classId,params) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"classId":classId,"attrName": params.fieldName, "attrType":params.fieldType, "attrGrade":params.fieldGrade,"attrDesc":params.fieldDesc})
  }
  const url = "/service/user/kernel/addattr";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: GROUPMANAGER_ADDFIELD_ADD_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_ADDFIELD_ADD_SUCCESS,
          payload: {
            fieldlist: result.data.content,
            totalCount: result.data.totalElements
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_ADDFIELD_ADD_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}
