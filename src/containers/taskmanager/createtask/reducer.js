import {  TASKINIT_REQUEST,TASKINIT_SUCCESS,TASKINIT_FAILURE,
  USERLIST_CHANGE,UPDATE_TASK_FILEDS,ADD_TASK_FILED,SAVE_TASKFIELD,
  SAVE_TASKFIELD_REQUEST,SAVE_TASKFIELD_SUCCESS,SAVE_TASKFIELD_FAILURE,
  TASK_NAME_CHANGE,TASK_DESC_CHANGE,CHANGE_END_DATE,CHANGE_START_DATE,
  
} from  './actionTypes';


const initialState = {
   taskname:"",
   taskdesc:"",
   startdate:null,
   enddate:null,
   fieldindex:1,
   userlist:[],
   kernellist:[],
   userIdlist:[],
   fieldlist:[],
}
export default (state = initialState , action) =>
{
  switch (action.type){
    case TASKINIT_REQUEST:
      return Object.assign({}, state, {
          userlist: action.payload.userlist,
          kernellist: action.payload.kernellist,
      });
    case TASKINIT_SUCCESS:
      return Object.assign({}, state, {
        userlist: action.payload.userlist,
        kernellist: action.payload.kernellist,
        });
    case TASKINIT_FAILURE:
      return Object.assign({}, state);    
    case USERLIST_CHANGE:
      return Object.assign({}, state, {
        userIdlist:action.payload.userIdlist
      });
    case UPDATE_TASK_FILEDS:
      return Object.assign({}, state, {
        fieldlist: action.payload.fieldlist
      });
    case ADD_TASK_FILED:
      return Object.assign({}, state, {
        fieldlist: action.payload.fieldlist,
        fieldindex: action.payload.fieldindex,
      });
    case SAVE_TASKFIELD:
      return Object.assign({}, state, {
        fieldlist: action.payload.fieldlist,
      });
    case TASK_NAME_CHANGE:
      return Object.assign({}, state, {
        taskname:action.payload.taskname,
      });
    case TASK_DESC_CHANGE:
      return Object.assign({}, state, {
        taskdesc:action.payload.taskdesc,
      });
    case CHANGE_START_DATE:
      return Object.assign({}, state, {
        startdate : action.payload.startdate
      });
    case CHANGE_END_DATE:
      return Object.assign({}, state, {
        enddate : action.payload.enddate
      });
    default:
      return state;
  }
}
