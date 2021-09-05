import { callApi } from "../../utils/apiUtils";

export const saveGroupUser = (params) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"userName": params.userName,"userCnname":params.userCnname, "userPassword":params.userPassword, "userEmail":params.userEmail})
  }
  const url = "/service/api/user/save";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: "system_manager_user_edit_query",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_user_update_success", 
          payload: {
            userinfo: result.data,
          }
        };
      },
      (error) => {
        return {
            type: "system_manager_user_update_failure", 
            payload: {
              error: error,
            }
        };
      }
  ));
}
