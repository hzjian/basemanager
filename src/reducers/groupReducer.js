import {
  SELECT_GROUPS_PAGE,
  INVALIDATE_GROUPS_PAGE,
  GROUPS_REQUEST,
  GROUPS_SUCCESS,
  GROUPS_FAILURE,
  EDIT_GROUPS_INFO,
  CLOSE_GROUPS_INFO,
  GROUP_DELETE_SUCCESS,
  NEW_GROUPS_INFO
} from "../actions/groupAction";

const initialState = {
    groups:[],
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
export function groupData(state = initialState , action)
{
  switch (action.type){
    case NEW_GROUPS_INFO:
    return {
      ...state,
      isnewgroup: action.payload.isnewgroup,
      isShowingModal: action.payload.isShowingModal
    };
    case CLOSE_GROUPS_INFO:
    case EDIT_GROUPS_INFO:
      return {
        ...state,
        isnewgroup: action.payload.isnewgroup,
        group: action.payload.group,
        isShowingModal: action.payload.isShowingModal
      };
    case SELECT_GROUPS_PAGE:
      return {
        ...state,
        page: action.payload.page
      }
    case INVALIDATE_GROUPS_PAGE:
      return {
        ...state,
        didInvalidate: true
      }
    case GROUPS_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case GROUPS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        totalCount: action.payload.totalCount,
        groups: action.payload.groups,
        page: action.payload.page,
        error: null
      }
    case GROUPS_FAILURE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        error: action.payload.error
      }
    case GROUP_DELETE_SUCCESS:
      return {
        ...state,
        delGroupGuid: action.payload.delGroupGuid,
      }   
    default:
      return state;
  }
}
