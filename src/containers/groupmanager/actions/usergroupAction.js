import {  callApi } from "../../../utils/apiUtils";
import {  notification } from 'antd'; 
import {  KERNEL_REQUEST,KERNEL_SUCCESS,KERNEL_FAILURE,
          MEMBER_REQUEST,MEMBER_SUCCESS,MEMBER_FAILURE,
          DATASOURCE_REQUEST,DATASOURCE_SUCCESS,DATASOURCE_FAILURE,
        } from  './types';

function KernelRequest() {
  return {
    type: KERNEL_REQUEST,
    payload: {
      isFetching: true,
    }
  };
}

function KernelSuccess(page) {
  return function(result) {
    return {
      type: KERNEL_SUCCESS,
      payload: {
        page: page,
        kernellist: result.data,
        isFetching:false,
      }
    };
  };
}

function KernelFailure() {
  return function(error) {
    return {
      type: KERNEL_FAILURE,
      payload: {
        error:error
      }
    };
  };
}

export const fetchKernelData = (page) => dispatch => {
  const requestPara = {
    page:0,
    pageSize:10,
    sortField:'name',
    sortDirection:'DESC'
  };
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify(requestPara),
  }
  dispatch(callApi(
    "/service/api/kernels",
    config,
    KernelRequest(),
    KernelSuccess(page),
    KernelFailure()
  ));
}

function saveKernelSuccess() {
  return function(result) {
    return {
      type: KERNEL_SUCCESS,
      payload: {
        kernellist: result.data,
        isFetching:false,
      }
    };
  };
}

export const saveKernelData = (data) => dispatch => {
  
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify(data),
  }
  dispatch(callApi(
    "/service/api/kernel/save",
    config,
    KernelRequest(),
    saveKernelSuccess(),
    KernelFailure()
  ));
}

function memberRequest() {
  return {
    type: MEMBER_REQUEST,
    payload: {
      isFetching: true
    }
  };
}

function memberSuccess(page) {
  return function(result) {
    return {
      type: MEMBER_SUCCESS,
      payload: {
        page: page,
        memberList: result.data,
        totalCount: result.data.totalElements
      }
    };
  };
}

function memberFailure() {
  return function(error) {
    return {
      type: MEMBER_FAILURE,
      payload: {
        error:error
      }
    };
  };
}

export const saveGroupMember = (data) => dispatch => {
  
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify(data),
  }
  dispatch(callApi(
    "/service/api/member/save",
    config,
    KernelRequest(),
    saveKernelSuccess(),
    KernelFailure()
  ));
}

export const fetchGroupMember = (page) => dispatch => {
  const requestPara = {
    page:0,
    pageSize:10,
    sortField:'groupName',
    sortDirection:'DESC'
  };
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify(requestPara),
  }
  dispatch(callApi(
    "/service/api/members",
    config,
    memberRequest(),
    memberSuccess(page),
    memberFailure()
  ));
}



function datasourceRequest() {
  return {
    type: DATASOURCE_REQUEST,
    payload: {
      isFetching: true
    }
  };
}

function datasourceSuccess(page) {
  return function(result) {
    return {
      type: DATASOURCE_SUCCESS,
      payload: {
        page: page,
        groups: result.data.content,
        totalCount: result.data.totalElements
      }
    };
  };
}

function datasourceFailure() {
  return function(error) {
    return {
      type: DATASOURCE_FAILURE,
      payload: {
        error:error
      }
    };
  };
}

export const fetchGroupDataSource = (page) => dispatch => {
  const requestPara = {
    page:0,
    pageSize:10,
    sortField:'groupName',
    sortDirection:'DESC'
  };
  const config ={
    method: 'POST',
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify(requestPara),
  }
  dispatch(callApi(
    "/service/api/groups",
    config,
    datasourceRequest(),
    datasourceSuccess(page),
    datasourceFailure()
  ));
}
