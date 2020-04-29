import { callApi } from "../../utils/apiUtils";
import {
    GROUPMANAGER_DICTITEM_QUERY_REQUEST,GROUPMANAGER_DICTITEM_QUERY_SUCCESS,GROUPMANAGER_DICTITEM_QUERY_FAILURE,
    GROUPMANAGER_DICTITEM_ADD_REQUEST,GROUPMANAGER_DICTITEM_ADD_SUCCESS,GROUPMANAGER_DICTITEM_ADD_FAILURE,
    GROUPMANAGER_DICTITEM_DELETE_REQUEST,GROUPMANAGER_DICTITEM_DELETE_SUCCESS,GROUPMANAGER_DICTITEM_DELETE_FAILURE,
  } from './actionTypes'

export const fetchItemList = (dictId) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"dictId":dictId })
  }
  const url = "/service/common/dict/items";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: GROUPMANAGER_DICTITEM_QUERY_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_DICTITEM_QUERY_SUCCESS,
          payload: {
            itemlist: result.data,
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_DICTITEM_QUERY_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const addDictItem = (dictId,dictItem) => dispatch => {
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"dictId":dictId , "dictItem":dictItem })
  }
  const url = "/service/common/dict/additem";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: GROUPMANAGER_DICTITEM_ADD_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_DICTITEM_ADD_SUCCESS,
          payload: {
            addField: result.data,
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_DICTITEM_ADD_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const deleteDictItem = (gid) => dispatch => {
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"gid":gid})
  }
  const url = "/service/common/dict/deleteitem";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: GROUPMANAGER_DICTITEM_DELETE_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_DICTITEM_DELETE_SUCCESS,
          payload: {
            deleteField: result.data,
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_DICTITEM_DELETE_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}