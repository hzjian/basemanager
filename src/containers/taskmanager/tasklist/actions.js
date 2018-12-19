import { callApi } from "../../utils/apiUtils";
import {
          SELECT_TASKS_PAGE,
          INVALIDATE_TASKS_PAGE,
          TASKS_REQUEST,
          TASKS_SUCCESS,
          TASKS_FAILURE

        } from './actionTypes'


export function selectTasksPage(page) {
  return {
    type: SELECT_TASKS_PAGE,
    page
  };
}

export function invalidateTasksPage(page) {
  return {
    type: INVALIDATE_TASKS_PAGE,
    page
  };
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


function fetchToptasks(page) {
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
function shouldFetchTasks(state, page) {
  // Check cache first
  const tasks = state.userTasksByPage[page];
  if (!tasks) {
    // Not cached, should fetch
    return true;
  }

  if (tasks.isFetching) {
    // Shouldn't fetch since fetching is running
    return false;
  }

  // Should fetch if cache was invalidate
  return tasks.didInvalidate;
}

export function fetchTopTasksIfNeeded(page) {
  return (dispatch, getState) => {
    if (shouldFetchTasks(getState(), page)) {
      return dispatch(fetchToptasks(page));

    }
  };
}

