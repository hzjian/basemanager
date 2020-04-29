import { callApi } from "../../utils/apiUtils";
import {
    GROUPMANAGER_ADDDICT_ADD_REQUEST,GROUPMANAGER_ADDDICT_ADD_SUCCESS,GROUPMANAGER_ADDDICT_ADD_FAILURE,
  } from './actionTypes'

export const saveGroupDict = (params) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"dictName":params.dictName,"dictDesc": params.dictDesc})
  }
  const url = "/service/common/dict/save";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: GROUPMANAGER_ADDDICT_ADD_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_ADDDICT_ADD_SUCCESS,
          payload: {
            fieldlist: result.data.content,
            totalCount: result.data.totalElements
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_ADDDICT_ADD_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}
