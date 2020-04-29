import { callApi } from "../../utils/apiUtils";
import {
    GROUPMANAGER_FEATURE_ADD_REQUEST,GROUPMANAGER_FEATURE_ADD_SUCCESS,GROUPMANAGER_FEATURE_ADD_FAILURE,
  } from './actionTypes'

export const addKernelFeature = (classId,params) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"classId":classId,"name": params.featureName, "geomStyle": JSON.stringify(params.geomStyle)})
  }
  const url = "/service/group/kernel/addfeature";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: GROUPMANAGER_FEATURE_ADD_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_FEATURE_ADD_SUCCESS,
          payload: {
            fieldlist: result.data.content,
            totalCount: result.data.totalElements
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_FEATURE_ADD_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}
