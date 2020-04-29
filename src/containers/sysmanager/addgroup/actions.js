import { callApi } from "../../utils/apiUtils";
import {
    SYSMANAGER_GROUPMGR_ADD_REQUEST,SYSMANAGER_GROUPMGR_ADD_SUCCESS,SYSMANAGER_GROUPMGR_ADD_FAILURE,
  } from './actionTypes'

export const addNewGroup = (params) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"groupName":params.groupName,"groupAddress":params.groupAddress,"groupCode": params.groupCode, 
                            "groupPhone":params.groupPhone, "groupPic":params.groupPic,"groupService":params.groupService,"groupStatus":params.groupStatus})
  }
  const url = "/service/api/group/save";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: SYSMANAGER_GROUPMGR_ADD_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: SYSMANAGER_GROUPMGR_ADD_SUCCESS,
          payload: {
            fieldlist: result.data.content,
            totalCount: result.data.totalElements
          }
        };
      },
      (error) => {
        return {
            type: SYSMANAGER_GROUPMGR_ADD_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}
