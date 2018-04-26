import {  KERNEL_REQUEST,KERNEL_SUCCESS,KERNEL_FAILURE,
  MEMBER_REQUEST,MEMBER_SUCCESS,MEMBER_FAILURE,
  DATASOURCE_REQUEST,DATASOURCE_SUCCESS,DATASOURCE_FAILURE,
} from  '../containers/groupmanager/actions/types';


const initialState = {
    kernelList:[],
    memberList:[],
    page : 0,
    newgroup:{
      groupGuid:"",
      groupName: "",
      groupAddress:"",
      groupPhone:""
    },
    group:{
      groupGuid:"",
      groupName: "",
      groupAddress:"",
      groupPhone:""
    },
    isnewgroup: false,
    isFetching: false,
    didInvalidate: false,
    totalCount: 0,
    error: null,
    delGroupGuid:"",
    isShowingModal:false
}
export function userGroupData(state = initialState , action)
{
  switch (action.type){
    case KERNEL_REQUEST:
      return {
        ...state,
        isFetching: action.payload.isFetching
        };
    case KERNEL_SUCCESS:
      return {
        ...state,
        kernelList: action.payload.kernellist,
        isFetching: action.payload.isFetching
        };
    case KERNEL_FAILURE:
      return {
        ...state
      };       
    case MEMBER_REQUEST:
      return {
        ...state
        };
    case MEMBER_SUCCESS:
      return {
        ...state,
        memberList: action.payload.memberList,
        isFetching: action.payload.isFetching
        };
    case MEMBER_FAILURE:
      return {
        ...state
      };
    case DATASOURCE_REQUEST:
      return {
        ...state
        };
    case DATASOURCE_SUCCESS:
      return {
        ...state
        };
    case DATASOURCE_FAILURE:
      return {
        ...state
      };            
    default:
      return state;
  }
}
