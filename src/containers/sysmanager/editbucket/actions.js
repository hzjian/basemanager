import { callApi } from "../../utils/apiUtils";


export const getBucket = (id,bktType) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({id:id,"type":bktType})
  }
  const url = "/service/api/bucket/find";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: "system_manager_bucket_find_query",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_bucket_find_success",
          payload: {
            bktData: result.data,
          }
        };
      },
      (error) => { 
        return {
            type: "system_manager_bucket_find_failure",
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const addBucket = (id,bktType,bktTitle,bktContent,image,thumbnail,imgwidth,imgheight) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({id:id,"type":bktType,"title":bktTitle,"content":bktContent,"image":image,
    "bktThumbnail":thumbnail,"bktSketch":bktContent.substring(0,100) ,imageWidth:imgwidth,imageHeight:imgheight})
  }
  const url = "/service/api/bucket/save";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: "system_manager_bucket_save_query",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_bucket_save_success",
          payload: {
            userId: result.data.userName,
          }
        };
      },
      (error) => { 
        return {
            type: "system_manager_bucket_save_failure",
            payload: {
              error: error,
            }
        };
      }
  ));
}