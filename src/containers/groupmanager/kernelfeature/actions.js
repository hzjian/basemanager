import { callApi } from "../../utils/apiUtils";
import {
    GROUPMANAGER_KERNELFEATURE_QUERY_REQUEST,GROUPMANAGER_KERNELFEATURE_QUERY_SUCCESS,GROUPMANAGER_KERNELFEATURE_QUERY_FAILURE,
    GROUPMANAGER_KERNELFEATURE_RANKLIST_QUERY_REQUEST,GROUPMANAGER_KERNELFEATURE_RANKLIST_QUERY_SUCCESS,GROUPMANAGER_KERNELFEATURE_RANKLIST_QUERY_FAILURE,
    GROUPMANAGER_KERNELFEATURE_RANKUPDATE_QUERY_REQUEST,GROUPMANAGER_KERNELFEATURE_RANKUPDATE_QUERY_SUCCESS,GROUPMANAGER_KERNELFEATURE_RANKUPDATE_QUERY_FAILURE,
    GROUPMANAGER_KERNELFEATURE_AVALIABLE_QUERY_REQUEST,GROUPMANAGER_KERNELFEATURE_AVALIABLE_QUERY_SUCCESS,GROUPMANAGER_KERNELFEATURE_AVALIABLE_QUERY_FAILURE,
    GROUPMANAGER_KERNELFEATURE_ADD_EXIST_REQUEST,GROUPMANAGER_KERNELFEATURE_ADD_EXIST_SUCCESS,GROUPMANAGER_KERNELFEATURE_ADD_EXIST_FAILURE,
    GROUPMANAGER_KERNELFEATURE_DELETE_REQUEST,GROUPMANAGER_KERNELFEATURE_DELETE_SUCCESS,GROUPMANAGER_KERNELFEATURE_DELETE_FAILURE,
    GROUPMANAGER_KERNELFEATURE_RANK_UPDATE_REQUEST,GROUPMANAGER_KERNELFEATURE_RANK_UPDATE_SUCCESS,GROUPMANAGER_KERNELFEATURE_RANK_UPDATE_FAILURE,
  } from './actionTypes'

export const fetchFeatureList = (classId,page,pageSize,sortDirection,sortField) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"classId":classId,"page": page,"pageSize": pageSize, "sortDirection":sortDirection ,"sortField": sortField})
  }
  const url = "/service/user/kernel/features";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: GROUPMANAGER_KERNELFEATURE_QUERY_REQUEST,
          payload: {
            page:page
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_KERNELFEATURE_QUERY_SUCCESS,
          payload: {
            featurelist: result.data.content,
            totalCount: result.data.totalElements
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_KERNELFEATURE_QUERY_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}


export const saveRankName= (rankId,rankName) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"rankId":rankId , "rankName":rankName })
  }
  const url = "/service/user/taskattr/rankupdate";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: GROUPMANAGER_KERNELFEATURE_RANKUPDATE_QUERY_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_KERNELFEATURE_RANKUPDATE_QUERY_SUCCESS,
          payload: {
            ranklist: result.data,
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_KERNELFEATURE_RANKUPDATE_QUERY_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const addAttrToTask = (attrId,taskId,classId) => dispatch => {
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"attrId":attrId , "taskId":taskId,"isEdit":0 })
  }
  const url = "/service/user/taskattr/addexist";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: GROUPMANAGER_KERNELFEATURE_ADD_EXIST_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_KERNELFEATURE_ADD_EXIST_SUCCESS,
          payload: {
            addField: result.data,
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_KERNELFEATURE_ADD_EXIST_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const deleteFeature = (id) => dispatch => {
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"id":id})
  }
  const url = "/service/group/kernel/deletefeature";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: GROUPMANAGER_KERNELFEATURE_DELETE_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_KERNELFEATURE_DELETE_SUCCESS,
          payload: {
            deletefeature: result.data,
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_KERNELFEATURE_DELETE_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const saveAttrRankValue = (taskId,attrId,rankId,rankName) => dispatch => {
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"attrId":attrId , "taskId":taskId,"rankId":rankId})
  }
  const url = "/service/user/taskattr/update";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: GROUPMANAGER_KERNELFEATURE_RANK_UPDATE_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_KERNELFEATURE_RANK_UPDATE_SUCCESS,
          payload: {
            rankName: rankName,
            rankId: rankId,
            attrId:attrId,
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_KERNELFEATURE_RANK_UPDATE_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const saveTaskAttrStatus = (taskId,attrId,editstate) => dispatch => {
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"attrId":attrId , "taskId":taskId,"isEdit":editstate})
  }
  const url = "/service/user/taskattr/update";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: GROUPMANAGER_KERNELFEATURE_RANK_UPDATE_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: GROUPMANAGER_KERNELFEATURE_RANK_UPDATE_SUCCESS,
          payload: {
            attrId:attrId,
            isEdit:editstate,
          }
        };
      },
      (error) => {
        return {
            type: GROUPMANAGER_KERNELFEATURE_RANK_UPDATE_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}
