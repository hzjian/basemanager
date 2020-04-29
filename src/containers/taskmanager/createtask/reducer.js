import {  
  TASKMANAGER_CREATETASK_CREATE_REQUEST,TASKMANAGER_CREATETASK_CREATE_SUCCESS,TASKMANAGER_CREATETASK_CREATE_FAILURE,
  TASKMANAGER_CREATETASK_KERNELS_REQUEST,TASKMANAGER_CREATETASK_KERNELS_SUCCESS,TASKMANAGER_CREATETASK_KERNELS_FAILURE,
  
} from  './actionTypes';


const initialState = {
   taskname:"",
   taskdesc:"",
   startdate:"",
   enddate:"",
   fieldindex:1,
   userlist:[],
   kernellist:[],
   userIdlist:[],
   fieldlist:[],
}
export default (state = initialState , action) =>
{
  switch (action.type){
    case TASKMANAGER_CREATETASK_CREATE_SUCCESS:
      return Object.assign({}, state, {
        userlist: action.payload.userlist,
        kernellist: action.payload.kernellist,
        });
    case TASKMANAGER_CREATETASK_KERNELS_SUCCESS:
      return Object.assign({},state,{
        kernels: action.payload.kernels,
        totleCount:action.payload.totleCount,
      });
    default:
      return state;
  }
}
