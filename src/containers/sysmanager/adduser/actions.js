import { callApi } from "../../utils/apiUtils";
import {
    SYSMANAGER_ADDUSER_ADD_REQUEST,SYSMANAGER_ADDUSER_ADD_SUCCESS,SYSMANAGER_ADDUSER_ADD_FAILURE,
  } from './actionTypes'

export const addGroupUser = (groupId,params) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"groupGuid":groupId,"userName": params.userName,"userCnname":params.userCnname, "userPassword":params.userPassword, "userEmail":params.userEmail})
  }
  const url = "/service/api/user/save";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: SYSMANAGER_ADDUSER_ADD_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: SYSMANAGER_ADDUSER_ADD_SUCCESS,
          payload: {
            userinfo: result.data,
          }
        };
      },
      (error) => {
        return {
            type: SYSMANAGER_ADDUSER_ADD_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}
