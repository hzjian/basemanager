import {  callApi } from "../../../utils/apiUtils";
import {  notification } from 'antd'; 
import {  TASKINIT_REQUEST,TASKINIT_SUCCESS,TASKINIT_FAILURE,
        USERLIST_CHANGE,UPDATE_TASK_FILEDS,ADD_TASK_FILED,SAVE_TASKFIELD,
        SAVE_TASKFIELD_REQUEST,SAVE_TASKFIELD_SUCCESS,SAVE_TASKFIELD_FAILURE,
        TASK_NAME_CHANGE,TASK_DESC_CHANGE,CHANGE_END_DATE,CHANGE_START_DATE,
        } from  './CreateTaskTypes';

function TaskInitRequest() {
  return {
    type: TASKINIT_REQUEST,
    payload: {
      isFetching: true,
    }
  };
}

function TaskInitSuccess(page) {
  return function(result) {
    return {
      type: TASKINIT_SUCCESS,
      payload: {
        kernellist: result.data.kernellist,
        userlist: result.data.userlist
      }
    };
  };
}

function TaskInitFailure() {
  return function(error) {
    return {
      type: TASKINIT_FAILURE,
      payload: {
        error:error
      }
    };
  };
}



export const fetchTaskData = () => dispatch => {

  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    },
  }
  dispatch(callApi(
    "/service/task/initTaskData",
    config,
    TaskInitRequest(),
    TaskInitSuccess(),
    TaskInitFailure()
  ));
}

export const changeUserList = (userIdList) => dispatch =>{
  dispatch({
    type: USERLIST_CHANGE,
    payload: {
      userIdList: userIdList,
    }
  });
}

export const updateFieldList = (fieldList) => dispatch =>{
  dispatch({
    type: UPDATE_TASK_FILEDS,
    payload: {
      fieldList: fieldList,
    }
  });
}

export const addTaskField = (fieldList,fieldindex) => dispatch =>{
  dispatch({
    type: ADD_TASK_FILED,
    payload: {
      fieldList: fieldList,
      fieldindex: fieldindex+1,
    }
  });
}


export const changeTaskName = (tname) => dispatch =>{
  dispatch({
    type: TASK_NAME_CHANGE,
    payload: {
      taskname: tname
    }
  });
}

export const changeTaskDesc = (tdesc) => dispatch =>{
  dispatch({
    type: TASK_DESC_CHANGE,
    payload: {
      taskdesc: tdesc
    }
  });
}

export const saveTaskField = (fieldList) => dispatch =>{
 dispatch({
    type: SAVE_TASKFIELD,
    payload:{
      fieldList:fieldList,
    }
  }
 );
}


export const changeSdate = (sdate) =>(dispatch) =>
{
   dispatch(
    {
       type: CHANGE_START_DATE,
       payload:{
        startdate: sdate,
       }

    }
   );
}



export const changeEdate = (edate) =>(dispatch) =>
{
   dispatch(
    {
       type: CHANGE_END_DATE,
       payload:{
        enddate: edate,
       }

    }
   );
}

export const submitCreateTask = () =>(dispatch,getState) =>
{
  console.log(getState());

}