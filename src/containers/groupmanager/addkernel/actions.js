import { callApi } from "../../utils/apiUtils";
import {
    GROUPMANAGER_ADDMEMBER_ADD_REQUEST,GROUPMANAGER_ADDMEMBER_ADD_SUCCESS,GROUPMANAGER_ADDMEMBER_ADD_FAILURE,
  } from './actionTypes'

export const addGroupKernel = (params) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"className": params.kernelName,"geoType":params.geoType, "descInfo":params.descInfo, "geomStyle":JSON.stringify(params.geomStyle)})
  }
  const url = "/service/group/kernel/save";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: GROUPMANAGER_ADDMEMBER_ADD_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_ADDMEMBER_ADD_SUCCESS,
          payload: {
            userinfo: result.data,
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_ADDMEMBER_ADD_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}
