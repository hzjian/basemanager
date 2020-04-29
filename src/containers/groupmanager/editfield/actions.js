import { callApi } from "../../utils/apiUtils";
import {
    GROUPMANAGER_ADDFIELD_ADD_REQUEST,GROUPMANAGER_ADDFIELD_ADD_SUCCESS,GROUPMANAGER_ADDFIELD_ADD_FAILURE,
  } from './actionTypes'

export const saveKernelField = (params) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"attrId":params.attrId,"attrName": params.attrName, "attrType":params.attrType, "attrGrade":params.attrFgrade,"attrDesc":params.attrDesc})
  }
  const url = "/service/user/kernel/updateattr";
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
