import { callApi } from "../../utils/apiUtils";

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
          type: "system_manager_user_add_query",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_user_add_success", 
          payload: {
            userinfo: result.data,
          }
        };
      },
      (error) => {
        return {
            type:  "system_manager_user_add_failure", 
            payload: {
              error: error,
            }
        };
      }
  ));
}
