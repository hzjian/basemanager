import { callApi } from "../../utils/apiUtils";

export const fetchCompanyList = (skey,page,pageSize) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"skey":skey,"page": page+1,"pageSize": pageSize})
  }
  const url = "/service/api/company/list";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: "system_manager_company_list_query",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_company_list_query_success",
          payload: {
            companylist: result.data.content,
            totalCount: result.data.totalElements,
          }
        };
      },
      (error) => {
        return {
            type: "system_manager_company_list_query_failure",
            payload: {
              error: error,
            }
        };
      }
  ));
}


export const upOrderCompany= (id,skey,page,pageSize) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"id":id,"skey":skey,"page": page+1,"pageSize": pageSize})
  }
  const url = "/service/api/company/uporder";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: "system_manager_company_uporder_query",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_company_list_query_success",
          payload: {
            companylist: result.data.content,
            totalCount: result.data.totalElements,
          }
        };
      },
      (error) => {
        return {
            type: "system_manager_company_uporder_failure",
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const downOrderCompany= (id,skey,page,pageSize) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"id":id,"skey":skey,"page": page+1,"pageSize": pageSize})
  }
  const url = "/service/api/company/downorder";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: "system_manager_company_downorder_query",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_company_list_query_success",
          payload: {
            companylist: result.data.content,
            totalCount: result.data.totalElements,
          }
        };
      },
      (error) => {
        return {
            type: "system_manager_company_downorder_failure",
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const topOrderCompany= (id,skey,page,pageSize) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"id":id,"skey":skey,"page": page+1,"pageSize": pageSize})
  }
  const url = "/service/api/company/toporder";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: "system_manager_company_toporder_query",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_company_list_query_success",
          payload: {
            companylist: result.data.content,
            totalCount: result.data.totalElements,
          }
        };
      },
      (error) => {
        return {
            type: "system_manager_company_toporder_failure",
            payload: {
              error: error,
            }
        };
      }
  ));
}
export const cancelTopOrderCompany= (id,skey,page,pageSize) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"id":id,"skey":skey,"page": page+1,"pageSize": pageSize})
  }
  const url = "/service/api/company/canceltoporder";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: "system_manager_company_canceltoporder_query",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_company_list_query_success",
          payload: {
            companylist: result.data.content,
            totalCount: result.data.totalElements,
          }
        };
      },
      (error) => {
        return {
            type: "system_manager_company_canceltoporder_failure",
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const lastOrderCompany= (id,skey,page,pageSize) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"id":id,"skey":skey,"page": page+1,"pageSize": pageSize})
  }
  const url = "/service/api/company/lastorder";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: "system_manager_company_canceltoporder_query",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_company_list_query_success",
          payload: {
            companylist: result.data.content,
            totalCount: result.data.totalElements,
          }
        };
      },
      (error) => {
        return {
            type: "system_manager_company_canceltoporder_failure",
            payload: {
              error: error,
            }
        };
      }
  ));
}


export const deleteCompany= (id,skey,page,pageSize) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"id":id,"skey":skey,"page": page+1,"pageSize": pageSize})
  }
  const url = "/service/api/company/delete";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: "system_manager_company_delete_query",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_company_list_query_success",
          payload: {
            companylist: result.data.content,
            totalCount: result.data.totalElements,
          }
        };
      },
      (error) => {
        return {
            type: "system_manager_company_delete_failure",
            payload: {
              error: error,
            }
        };
      }
  ));
}