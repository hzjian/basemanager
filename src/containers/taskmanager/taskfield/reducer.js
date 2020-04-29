/* jshint esversion: 6 */

import {
  TASKMANAGER_TASKFIELD_QUERY_REQUEST,TASKMANAGER_TASKFIELD_QUERY_SUCCESS,TASKMANAGER_TASKFIELD_QUERY_FAILURE,
  TASKMANAGER_TASKFIELD_RANKLIST_QUERY_SUCCESS,TASKMANAGER_TASKFIELD_AVALIABLE_QUERY_SUCCESS,
  TASKMANAGER_TASKFIELD_ADD_EXIST_SUCCESS,TASKMANAGER_TASKFIELD_DELETE_SUCCESS,
  TASKMANAGER_TASKFIELD_RANK_UPDATE_SUCCESS,
} from "./actionTypes";

const initialState = {
    fieldlist:[],
    totalCount:0
};

export default (state = initialState,action)  => {
  switch (action.type) {
      case TASKMANAGER_TASKFIELD_QUERY_REQUEST:
        return Object.assign({}, state, {
            page: action.payload.page,
        });
      case TASKMANAGER_TASKFIELD_QUERY_SUCCESS:
          return Object.assign({}, state, {
              fieldlist: action.payload.fieldlist,
              totalCount: action.payload.totalCount
          });
      case TASKMANAGER_TASKFIELD_RANKLIST_QUERY_SUCCESS:
        return Object.assign({}, state, {
            ranklist: action.payload.ranklist,
        });    
      case TASKMANAGER_TASKFIELD_AVALIABLE_QUERY_SUCCESS:
          return Object.assign({},state,{
              attrList: action.payload.attrList,
          });    
      case TASKMANAGER_TASKFIELD_ADD_EXIST_SUCCESS:
          return Object.assign({},state,{
              addField: action.payload.addField
          }); 
      case TASKMANAGER_TASKFIELD_DELETE_SUCCESS:
          return Object.assign({},state,{
              deleteField: action.payload.deleteField
          });  
      case TASKMANAGER_TASKFIELD_RANK_UPDATE_SUCCESS:
            return Object.assign({},state,{
                rankName: action.payload.rankName,
                attrId: action.payload.attrId,
                fieldlist: state.fieldlist.map((item) =>{
                    if(item.attrId === action.payload.attrId)
                    {
                        if(action.payload.rankName)
                        {
                            item.rankName = action.payload.rankName;
                        }
                        if(action.payload.isEdit)
                        {
                            item.attrIsedit = action.payload.isEdit;
                        }
                    }
                    return item;
                })
            });  
      case TASKMANAGER_TASKFIELD_QUERY_FAILURE:
          return Object.assign({}, state, {
              error: action.payload.error
          });
    default:
      return state;
  }
};
