import { callApi } from "../../utils/apiUtils";


export const getCompany = (id) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({id:id})
  }
  const url = "/service/api/company/find";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: "system_manager_company_find_query",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_company_find_success",
          payload: {
            companydData: result.data,
          }
        };
      },
      (error) => { 
        return {
            type: "system_manager_company_find_failure",
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const addCompany = (id,name,companyDesc,image,logoThumbnail,imgwidth,imgheight) =>(dispatch) =>{
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({id:id,"name":name,"companyDesc":companyDesc,"logoSrc":image,
    "logoThumbnail":logoThumbnail,"companySketch":companyDesc.substring(0,100),imageWidth:imgwidth,imageHeight:imgheight})
  }
  const url = "/service/api/company/save";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: "system_manager_company_save_query",
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: "system_manager_company_save_success",
          payload: {
            id: result.data.id,
          }
        };
      },
      (error) => { 
        return {
            type: "system_manager_company_save_failure",
            payload: {
              error: error,
            }
        };
      }
  ));
}