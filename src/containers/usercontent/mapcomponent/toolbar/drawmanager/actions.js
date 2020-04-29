import { callApi } from '../../../../utils/apiUtils';
import {
  CONTENT_MAP_DRAWMANAGER_SAVE_KERNEL_REQUEST,CONTENT_MAP_DRAWMANAGER_SAVE_KERNEL_SUCCESS,CONTENT_MAP_DRAWMANAGER_SAVE_KERNEL_FAILURE,
  CONTENT_POPUP_GEOMETRY_SAVE_REQUEST,CONTENT_POPUP_GEOMETRY_SAVE_SUCCESS, CONTENT_POPUP_GEOMETRY_SAVE_FAILURE,
} from '../../../actionTypes';

export const saveKernelData = (layerId,geoJson) => dispatch => {
    const config ={
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({"layerId":layerId,"geoJson":geoJson,anno:'',featureId:null})
    }
    const url = "/service/data/save";
  
    return dispatch(callApi(
        url,
        config,
        () =>{
          return {
              type: CONTENT_MAP_DRAWMANAGER_SAVE_KERNEL_REQUEST,
              payload: {
              }
          };
        },
        (result) => {
          return {
              type: CONTENT_MAP_DRAWMANAGER_SAVE_KERNEL_SUCCESS,
              payload: {
                saveResult: result.data,
                layerId:layerId,
                geoJson:geoJson,
              }
          };
        },
        (error) => {
          return {
              type: CONTENT_MAP_DRAWMANAGER_SAVE_KERNEL_FAILURE,
              error
          };
        }
    ));
  }

  
export const updateKernelData =(layerId,kernelId,geoJson) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"layerId":layerId,"kernelId":kernelId,geoJson:geoJson})
  }
  const url = "/service/data/update";

  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
            type: CONTENT_POPUP_GEOMETRY_SAVE_REQUEST,
            payload: {
            }
        };
      },
      (result) => {
        return {
            type: CONTENT_POPUP_GEOMETRY_SAVE_SUCCESS,
            payload: {
              kernelId: result.data.kernelId,
            }
        };
      },
      (error) => {
        return {
            type: CONTENT_POPUP_GEOMETRY_SAVE_FAILURE,
            error
        };
      }
  ));
}