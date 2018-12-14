import {  TASKINIT_REQUEST,TASKINIT_SUCCESS,TASKINIT_FAILURE,
  USERLIST_CHANGE,UPDATE_TASK_FILEDS,ADD_TASK_FILED,SAVE_TASKFIELD,
  SAVE_TASKFIELD_REQUEST,SAVE_TASKFIELD_SUCCESS,SAVE_TASKFIELD_FAILURE,
  TASK_NAME_CHANGE,TASK_DESC_CHANGE,CHANGE_END_DATE,CHANGE_START_DATE,
  
} from  '../containers/taskmanager/actions/CreateTaskTypes';


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
export function createTaskData(state = initialState , action)
{
  switch (action.type){
    case TASKINIT_REQUEST:
      return {
        ...state,
        };
    case TASKINIT_SUCCESS:
      return {
        ...state,
        userlist: action.payload.userlist,
        kernellist: action.payload.kernellist,
        };
    case TASKINIT_FAILURE:
      return {
        ...state
      };       
    case USERLIST_CHANGE:
      return {
        ...state,
        userIdlist:action.payload.userIdlist
      }
    case UPDATE_TASK_FILEDS:
      return {
        ...state,
        fieldlist: action.payload.fieldlist
      }
    case ADD_TASK_FILED:
      return {
        ...state,
        fieldlist: action.payload.fieldlist,
        fieldindex: action.payload.fieldindex,
      }
    case SAVE_TASKFIELD:
      return {
        ...state,
        fieldlist: action.payload.fieldlist,
      }
    case TASK_NAME_CHANGE:
      return {
        ...state,
        taskname:action.payload.taskname,
      }  
    case TASK_DESC_CHANGE:
      return {
        ...state,
        taskdesc:action.payload.taskdesc,
      }    
    case CHANGE_START_DATE:
      return {
        ...state,
        startdate : action.payload.startdate
      }
    case CHANGE_END_DATE:
      return {
        ...state,
        enddate : action.payload.enddate
      }  
    default:
      return state;
  }
}
