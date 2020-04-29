/* jshint esversion: 6 */

import {
  GROUPMANAGER_KERNELFIELD_QUERY_REQUEST,GROUPMANAGER_KERNELFIELD_QUERY_SUCCESS,GROUPMANAGER_KERNELFIELD_QUERY_FAILURE,
  GROUPMANAGER_KERNELFIELD_RANKLIST_QUERY_SUCCESS,GROUPMANAGER_KERNELFIELD_AVALIABLE_QUERY_SUCCESS,GROUPMANAGER_KERNELFIELD_ADD_EXIST_SUCCESS,GROUPMANAGER_KERNELFIELD_DELETE_SUCCESS,
  GROUPMANAGER_KERNELFIELD_RANK_UPDATE_SUCCESS,
} from "./actionTypes";

const initialState = {
    fieldlist:[],
    totalCount:0
};

export default (state = initialState,action)  => {
  switch (action.type) {
      case GROUPMANAGER_KERNELFIELD_QUERY_REQUEST:
        return Object.assign({}, state, {
            page: action.payload.page,
        });
      case GROUPMANAGER_KERNELFIELD_QUERY_SUCCESS:
          return Object.assign({}, state, {
              fieldlist: action.payload.fieldlist,
              totalCount: action.payload.totalCount
          });
      case GROUPMANAGER_KERNELFIELD_RANKLIST_QUERY_SUCCESS:
        return Object.assign({}, state, {
            ranklist: action.payload.ranklist,
        });    
      case GROUPMANAGER_KERNELFIELD_AVALIABLE_QUERY_SUCCESS:
          return Object.assign({},state,{
              attrList: action.payload.attrList,
          });    
      case GROUPMANAGER_KERNELFIELD_ADD_EXIST_SUCCESS:
          return Object.assign({},state,{
              addField: action.payload.addField
          }); 
      case GROUPMANAGER_KERNELFIELD_DELETE_SUCCESS:
          return Object.assign({},state,{
              deleteField: action.payload.deleteField
          });  
      case GROUPMANAGER_KERNELFIELD_RANK_UPDATE_SUCCESS:
            return Object.assign({},state,{
                rankName: action.payload.rankName,
                attrId: action.payload.attrId,
                fieldlist: state.fieldlist.map((item) =>{
                    if(item.attrId === action.payload.attrId)
                    {
                        if(action.payload.rankName)
                        {
                            item.rankName =action.payload.rankName;
                        }
                        if(action.payload.isEdit)
                        {
                            item.attrIsedit = action.payload.isEdit;
                        }
                    }
                    return item;
                })
            });  
      case GROUPMANAGER_KERNELFIELD_QUERY_FAILURE:
          return Object.assign({}, state, {
              error: action.payload.error
          });
    default:
      return state;
  }
};
