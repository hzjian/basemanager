import { callApi } from "../utils/apiUtils";

export const SELECT_TASKS_PAGE = "SELECT_TASKS_PAGE";
export const INVALIDATE_TASKS_PAGE = "INVALIDATE_TASKS_PAGE";

export const TASKS_REQUEST = "TASKS_REQUEST";
export const TASKS_SUCCESS = "TASK_SUCCESS";
export const TASKS_FAILURE = "TASK_FAILURE";

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
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: {
        page:1,
        pageSize:10,
        sortField:'name',
        sortDirection:'DESC'
    },
  }
  const url = "/service/busdata/userTaskData";
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

