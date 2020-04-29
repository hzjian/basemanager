import { callApi } from "../../utils/apiUtils";
import {
    GROUPMANAGER_DICT_EDIT_REQUEST,GROUPMANAGER_DICT_EDIT_SUCCESS,GROUPMANAGER_DICT_EDIT_FAILURE,
  } from './actionTypes'

export const saveGroupDict = (params) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"dictId":params.dictId,"dictName": params.dictName, "dictDesc":params.dictDesc})
  }
  const url = "/service/common/dict/save";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: GROUPMANAGER_DICT_EDIT_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_DICT_EDIT_SUCCESS,
          payload: {
            fieldlist: result.data.content,
            totalCount: result.data.totalElements
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_DICT_EDIT_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}
