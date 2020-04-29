import { callApi } from "../../utils/apiUtils";
import {
    GROUPMANAGER_FEATURE_EDIT_REQUEST,GROUPMANAGER_FEATURE_EDIT_SUCCESS,GROUPMANAGER_FEATURE_EDIT_FAILURE,
  } from './actionTypes'

export const saveKernelFeature = (params) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"id":params.id,"name": params.name, "geomStyle": JSON.stringify(params.geomStyle)})
  }
  const url = "/service/group/kernel/updatefeature";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: GROUPMANAGER_FEATURE_EDIT_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_FEATURE_EDIT_SUCCESS,
          payload: {
            fieldlist: result.data.content,
            totalCount: result.data.totalElements
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_FEATURE_EDIT_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}
