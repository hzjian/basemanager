import { callApi } from '../../utils/apiUtils';
import {
    CONTENT_POPUP_ANNO_SAVE_REQUEST,CONTENT_POPUP_ANNO_SAVE_SUCCESS, CONTENT_POPUP_ANNO_SAVE_FAILURE,
    CONTENT_POPUP_FEATURE_SAVE_REQUEST,CONTENT_POPUP_FEATURE_SAVE_SUCCESS, CONTENT_POPUP_FEATURE_SAVE_FAILURE,
    CONTENT_POPUP_PROPS_SAVE_REQUEST,CONTENT_POPUP_PROPS_SAVE_SUCCESS, CONTENT_POPUP_PROPS_SAVE_FAILURE,
    CONTENT_POPUP_DATA_DELETE_REQUEST,CONTENT_POPUP_DATA_DELETE_SUCCESS,CONTENT_POPUP_DATA_DELETE_FAILURE,
    CONTENT_POPUP_CLOSE_INFOBOX,
} from '../actionTypes';

export const closeInfoBox = () =>{
    return {
        type: CONTENT_POPUP_CLOSE_INFOBOX,
        payload: {
            closeInfoBox: true
        }
    };
}

export const saveKernelAnno = (layerId,kernelId,annoValue) => dispatch => {
    const config ={
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({"layerId":layerId,"kernelId":kernelId,"anno":annoValue})
    }
    const url = "/service/data/update";
  
    return dispatch(callApi(
        url,
        config,
        () =>{
          return {
              type: CONTENT_POPUP_ANNO_SAVE_REQUEST,
              payload: {
              }
          };
        },
        (result) => {
          return {
              type: CONTENT_POPUP_ANNO_SAVE_SUCCESS,
              payload: {
                kernelId: result.data.kernelId,
                layerId:layerId,
                anno: annoValue
              }
          };
        },
        (error) => {
          return {
              type: CONTENT_POPUP_ANNO_SAVE_FAILURE,
              error
          };
        }
    ));
  }

  export const saveKernelFeature = (layerId,kernelId,featureId) => dispatch => {
    const config ={
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({"layerId":layerId,"kernelId":kernelId,"featureId":featureId})
    }
    const url = "/service/data/update";
  
    return dispatch(callApi(
        url,
        config,
        () =>{
          return {
              type: CONTENT_POPUP_FEATURE_SAVE_REQUEST,
              payload: {
              }
          };
        },
        (result) => {
          return {
              type: CONTENT_POPUP_FEATURE_SAVE_SUCCESS,
              payload: {
                kernelId: result.data.kernelId,
                layerId:layerId,
                featureId: featureId
              }
          };
        },
        (error) => {
          return {
              type: CONTENT_POPUP_FEATURE_SAVE_FAILURE,
              error
          };
        }
    ));
  }  

export const saveAttributeValue =(layerId,kernelId,attrId,attrValue) => dispatch => {
    const config ={
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({"layerId":layerId,"kernelId":kernelId,props:[{"attrId":attrId,"attrValue":attrValue}]})
    }
    const url = "/service/data/props/save";
  
    return dispatch(callApi(
        url,
        config,
        () =>{
          return {
              type: CONTENT_POPUP_PROPS_SAVE_REQUEST,
              payload: {
              }
          };
        },
        (result) => {
          return {
              type: CONTENT_POPUP_PROPS_SAVE_SUCCESS,
              payload: {
                  attrId: result.data.attrId,
                  attrValue: attrValue
              }
          };
        },
        (error) => {
          return {
              type: CONTENT_POPUP_PROPS_SAVE_FAILURE,
              error
          };
        }
    ));
  }

  export const deleteGeometory = (layerId,kernelId) => dispatch => {
    const config ={
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({"layerId":layerId,"kernelId":kernelId})
    }
    const url = "/service/data/delete";
  
    return dispatch(callApi(
        url,
        config,
        () =>{
          return {
              type: CONTENT_POPUP_DATA_DELETE_REQUEST,
              payload: {
              }
          };
        },
        (result) => {
          return {
              type: CONTENT_POPUP_DATA_DELETE_SUCCESS,
              payload: {
                kernelId: kernelId,
                layerId: layerId
              }
          };
        },
        (error) => {
          return {
              type: CONTENT_POPUP_DATA_DELETE_FAILURE,
              error
          };
        }
    ));
  }