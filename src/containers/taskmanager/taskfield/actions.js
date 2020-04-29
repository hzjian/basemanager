import { callApi } from "../../utils/apiUtils";
import {
    TASKMANAGER_TASKFIELD_QUERY_REQUEST,TASKMANAGER_TASKFIELD_QUERY_SUCCESS,TASKMANAGER_TASKFIELD_QUERY_FAILURE,
    TASKMANAGER_TASKFIELD_RANKLIST_QUERY_REQUEST,TASKMANAGER_TASKFIELD_RANKLIST_QUERY_SUCCESS,TASKMANAGER_TASKFIELD_RANKLIST_QUERY_FAILURE,
    TASKMANAGER_TASKFIELD_RANKUPDATE_QUERY_REQUEST,TASKMANAGER_TASKFIELD_RANKUPDATE_QUERY_SUCCESS,TASKMANAGER_TASKFIELD_RANKUPDATE_QUERY_FAILURE,
    TASKMANAGER_TASKFIELD_AVALIABLE_QUERY_REQUEST,TASKMANAGER_TASKFIELD_AVALIABLE_QUERY_SUCCESS,TASKMANAGER_TASKFIELD_AVALIABLE_QUERY_FAILURE,
    TASKMANAGER_TASKFIELD_ADD_EXIST_REQUEST,TASKMANAGER_TASKFIELD_ADD_EXIST_SUCCESS,TASKMANAGER_TASKFIELD_ADD_EXIST_FAILURE,
    TASKMANAGER_TASKFIELD_DELETE_REQUEST,TASKMANAGER_TASKFIELD_DELETE_SUCCESS,TASKMANAGER_TASKFIELD_DELETE_FAILURE,
    TASKMANAGER_TASKFIELD_RANK_UPDATE_REQUEST,TASKMANAGER_TASKFIELD_RANK_UPDATE_SUCCESS,TASKMANAGER_TASKFIELD_RANK_UPDATE_FAILURE,
  } from './actionTypes'

export const fetchFieldList = (taskId,layerId,page,pageSize,sortDirection,sortField) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"layerId":layerId,"taskId":taskId,"page": page,"pageSize": pageSize, "sortDirection":sortDirection ,"sortField": sortField})
  }
  const url = "/service/user/taskattr/list";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: TASKMANAGER_TASKFIELD_QUERY_REQUEST,
          payload: {
            page:page
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_TASKFIELD_QUERY_SUCCESS,
          payload: {
            fieldlist: result.data.content,
            totalCount: result.data.totalElements
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_TASKFIELD_QUERY_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const fetchTaskAttrRankList = (taskId) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"taskId":taskId })
  }
  const url = "/service/user/taskattr/ranklist";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: TASKMANAGER_TASKFIELD_RANKLIST_QUERY_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_TASKFIELD_RANKLIST_QUERY_SUCCESS,
          payload: {
            ranklist: result.data,
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_TASKFIELD_RANKLIST_QUERY_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}

//service/user/task/attr/avaliable
export const fetchTaskAttrAvaliable = (taskId,classId) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"taskId":taskId ,"classId":classId})
  }
  const url = "/service/user/task/attr/avaliable";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: TASKMANAGER_TASKFIELD_AVALIABLE_QUERY_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_TASKFIELD_AVALIABLE_QUERY_SUCCESS,
          payload: {
            attrList: result.data,
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_TASKFIELD_AVALIABLE_QUERY_FAILURE,
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
          type: TASKMANAGER_TASKFIELD_RANKUPDATE_QUERY_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_TASKFIELD_RANKUPDATE_QUERY_SUCCESS,
          payload: {
            ranklist: result.data,
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_TASKFIELD_RANKUPDATE_QUERY_FAILURE,
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
          type: TASKMANAGER_TASKFIELD_ADD_EXIST_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_TASKFIELD_ADD_EXIST_SUCCESS,
          payload: {
            addField: result.data,
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_TASKFIELD_ADD_EXIST_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}

export const deleteTaskAttr = (attrId,taskId,classId) => dispatch => {
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({"attrId":attrId , "taskId":taskId})
  }
  const url = "/service/user/taskattr/delete";
  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
          type: TASKMANAGER_TASKFIELD_DELETE_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_TASKFIELD_DELETE_SUCCESS,
          payload: {
            deleteField: result.data,
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_TASKFIELD_DELETE_FAILURE,
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
          type: TASKMANAGER_TASKFIELD_RANK_UPDATE_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_TASKFIELD_RANK_UPDATE_SUCCESS,
          payload: {
            rankName: rankName,
            rankId: rankId,
            attrId:attrId,
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_TASKFIELD_RANK_UPDATE_FAILURE,
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
          type: TASKMANAGER_TASKFIELD_RANK_UPDATE_REQUEST,
          payload: {
          }
        };
      },
      (result) => {
        return {
          type: TASKMANAGER_TASKFIELD_RANK_UPDATE_SUCCESS,
          payload: {
            attrId:attrId,
            isEdit:editstate,
          }
        };
      },
      (error) => {
        return {
            type: TASKMANAGER_TASKFIELD_RANK_UPDATE_FAILURE,
            payload: {
              error: error,
            }
        };
      }
  ));
}
