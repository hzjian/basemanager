import { callApi } from "../../utils/apiUtils";
import {
    SYSMANAGER_EDITUSER_UPDATE_REQUEST,SYSMANAGER_EDITUSER_UPDATE_SUCCESS,SYSMANAGER_EDITUSER_UPDATE_FAILURE,
  } from './actionTypes'

export const saveGroupUser = (params) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"userName": params.userName,"userCnname":params.userCnname, "userPassword":params.userPassword, "userEmail":params.userEmail})
  }
  const url = "/service/api/user/update";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: SYSMANAGER_EDITUSER_UPDATE_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: SYSMANAGER_EDITUSER_UPDATE_SUCCESS,
          payload: {
            userinfo: result.data,
          }
        };
      },
      (error) => {
        return {
            type: SYSMANAGER_EDITUSER_UPDATE_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}
