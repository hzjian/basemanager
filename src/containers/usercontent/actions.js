import { callApi } from "../utils/apiUtils";
import {
    SELECT_MAP_PAGE,
    INVALIDATE_MAP_PAGE,
    DRAW_ADD_MAP,
    MAP_REQUEST,
    MAP_SUCCESS,
    MAP_FAILURE,
    TASKS_REQUEST,
    TASKS_SUCCESS,
    TASKS_FAILURE

} from "./actionTypes";


export const selectMapsPage =(page) => dispatch =>{
  return {
    type: SELECT_MAP_PAGE,
    page
  };
}

//绘制完成返回信息
export const  drawAddMap = (payload) => dispatch => {
    return function(payload) {
        return {
            type: DRAW_ADD_MAP,
            drawdata: payload.data,

        };
    };
}

export const  invalidateMapsPage = (page) =>dispatch => {
  return {
    type: INVALIDATE_MAP_PAGE,
    page
  };
}

function mapRequest() {
    return {
        type: MAP_REQUEST,
    };
}

// This is a curried function that takes page as argument,
// and expects payload as argument to be passed upon API call success.
function mapSuccess() {
    return function(payload) {
        return {
            type: MAP_SUCCESS,
            geojson: payload.data
        };
    };
}

// This is a curried function that takes page as argument,
// and expects error as argument to be passed upon API call failure.
function mapFailure() {
    return function(error) {
        return {
            type: MAP_FAILURE,
            error
        };
    };
}
export const fetchTopmapgeojson = (queryRange,classId) => dispatch =>{
    const config ={
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({"queryRange":queryRange,"classId":classId})

    }
    const url = "/service/busdata/userTaskData";

    return callApi(
        url,
        config,
        mapRequest(),
        mapSuccess(),
        mapFailure()
    );
}
//绘制图形调用后台接口
export const DrawAddMap = (geoJson,featype,taskGuid,feaGuid) => dispatch => {
    // alert("尽量了");
    const config ={
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({"geoJson":geoJson,"featype":featype,"taskGuid":taskGuid,"feaGuid":feaGuid})
    }
    const url = "/service/busdata/saveData";

    return callApi(
        url,
        config,
        mapRequest(),
        mapSuccess(),
        mapFailure()
    );
}


function tasksRequest(page) {
    return {
      type: TASKS_REQUEST,
      page
    };
  }
  
  // This is a curried function that takes page as argument,
  // and expects payload as argument to be passed upon API call success.
  function tasksSuccess(page) {
    return function(payload) {
      return {
        type: TASKS_SUCCESS,
        page,
        tasks: payload.data,
        totalCount: payload.total_count
      };
    };
  }
  
  // This is a curried function that takes page as argument,
  // and expects error as argument to be passed upon API call failure.
  function tasksFailure(page) {
    return function(error) {
      return {
        type: TASKS_FAILURE,
        page,
        error
      };
    };
  }

  
export const fetchToptasks = (page) =>dispatch =>{ 
    const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json;charset=UTF-8"
      },
        body: JSON.stringify({"page":0,"pageSize":10, "sortDirection":"DESC","sortField":"taskName"})
    }
    const url = "/service/busdata/userTaskList";
  
    return callApi(
      url,
      config,
      tasksRequest(page),
      tasksSuccess(page),
      tasksFailure(page)
    );
  }