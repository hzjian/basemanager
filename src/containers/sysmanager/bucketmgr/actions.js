import { callApi } from "../../utils/apiUtils";

export const fetchBucketList = (bktType,skey,page,pageSize) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"type":bktType,"skey":skey,"page": page+1,"pageSize": pageSize})
  }
  const url = "/service/api/bucket/list";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: "system_manager_bucket_list_query",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_bucket_list_query_success",
          payload: {
            bucketlist: result.data.content,
            totalCount: result.data.totalElements,
          }
        };
      },
      (error) => {
        return {
            type: "system_manager_bucket_list_query_failure",
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const upOrderBucket= (id,bktType,skey,page,pageSize) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"id":id,"type":bktType,"skey":skey,"page": page+1,"pageSize": pageSize})
  }
  const url = "/service/api/bucket/uporder";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: "system_manager_bucket_uporder_query",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_bucket_list_query_success",
          payload: {
            bucketlist: result.data.content,
            totalCount: result.data.totalElements,
          }
        };
      },
      (error) => {
        return {
            type: "system_manager_bucket_uporder_failure",
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const downOrderBucket= (id,bktType,skey,page,pageSize) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"id":id,"type":bktType,"skey":skey,"page": page+1,"pageSize": pageSize})
  }
  const url = "/service/api/bucket/downorder";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: "system_manager_bucket_downorder_query",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_bucket_list_query_success",
          payload: {
            bucketlist: result.data.content,
            totalCount: result.data.totalElements,
          }
        };
      },
      (error) => {
        return {
            type: "system_manager_bucket_downorder_failure",
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const topOrderBucket= (id,bktType,skey,page,pageSize) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"id":id,"type":bktType,"skey":skey,"page": page+1,"pageSize": pageSize})
  }
  const url = "/service/api/bucket/toporder";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: "system_manager_bucket_toporder_query",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_bucket_list_query_success",
          payload: {
            bucketlist: result.data.content,
            totalCount: result.data.totalElements,
          }
        };
      },
      (error) => {
        return {
            type: "system_manager_bucket_toporder_failure",
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const cancelTopOrderBucket= (id,bktType,skey,page,pageSize) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"id":id,"type":bktType,"skey":skey,"page": page+1,"pageSize": pageSize})
  }
  const url = "/service/api/bucket/canceltoporder";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: "system_manager_bucket_canceltoporder_query",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_bucket_list_query_success",
          payload: {
            bucketlist: result.data.content,
            totalCount: result.data.totalElements,
          }
        };
      },
      (error) => {
        return {
            type: "system_manager_bucket_canceltoporder_failure",
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const deleteBucket= (id,bktType,skey,page,pageSize) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"id":id,"type":bktType,"skey":skey,"page": page+1,"pageSize": pageSize})
  }
  const url = "/service/api/bucket/delete";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: "system_manager_bucket_delete_query",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_bucket_list_query_success",
          payload: {
            bucketlist: result.data.content,
            totalCount: result.data.totalElements,
          }
        };
      },
      (error) => {
        return {
            type: "system_manager_bucket_delete_failure",
            payload: {
              error: error,
            }
        };
      }
  ));
}