import { callApi } from "../../utils/apiUtils";

export const fetchGroupUserList = (groupId,skey,page,pageSize) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"groupId":groupId,"skey":skey,"page": page,"pageSize": pageSize})
  }
  const url = "/service/api/users";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: "system_manager_user_query",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_user_query_success",
          payload: {
            groupuserlist: result.data.content,
            totalCount: result.data.totalElements,
          }
        };
      },
      (error) => {
        return {
            type: "system_manager_user_query_failure",
            payload: {
              error: error,
            }
        };
      }
  ));
}


export const addUserToGroup = (userId,groupId) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"groupId":groupId,"userName":userId})
  }
  const url = "/service/api/user/save";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: "system_manager_user_add",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_user_add_success",
          payload: {
            userId: result.data.userName,
          }
        };
      },
      (error) => {
        return {
            type: "system_manager_user_add_failure",
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const deleteGroupUser= (userId,groupId) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"groupId":groupId,"userName":userId})
  }
  const url = "/service/api/user/delete";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: "system_manager_user_delete",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_user_delete_success",
          payload: {
            userName: result.data,
          }
        };
      },
      (error) => {
        return {
            type: "system_manager_user_delete_failure",
            payload: {
              error: error,
            }
        };
      }
  ));
}