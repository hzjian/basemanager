import {  TASKMANAGER_QUERYTASK_TASKINFO_REQUEST,TASKMANAGER_QUERYTASK_TASKINFO_SUCCESS,TASKMANAGER_QUERYTASK_TASKINFO_FAILURE,
} from  './actionTypes';


const initialState = {
  name: '123',
}
export default (state = initialState , action) =>
{
  switch (action.type){
    case TASKMANAGER_QUERYTASK_TASKINFO_SUCCESS:
      return Object.assign({}, state, {
        taskInfo: action.payload.taskInfo
      });

    default:
      return state;
  }
}
