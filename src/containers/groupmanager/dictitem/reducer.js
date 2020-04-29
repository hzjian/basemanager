/* jshint esversion: 6 */

import {
  GROUPMANAGER_DICTITEM_QUERY_REQUEST,GROUPMANAGER_DICTITEM_QUERY_SUCCESS,GROUPMANAGER_DICTITEM_QUERY_FAILURE,
  GROUPMANAGER_DICTITEM_RANKLIST_QUERY_SUCCESS,GROUPMANAGER_DICTITEM_AVALIABLE_QUERY_SUCCESS,GROUPMANAGER_DICTITEM_ADD_SUCCESS,GROUPMANAGER_DICTITEM_DELETE_SUCCESS,
  GROUPMANAGER_DICTITEM_RANK_UPDATE_SUCCESS,
} from "./actionTypes";

const initialState = {

};

export default (state = initialState,action)  => {
  switch (action.type) {
      case GROUPMANAGER_DICTITEM_QUERY_REQUEST:
        return Object.assign({}, state, {
            page: action.payload.page,
        });
      case GROUPMANAGER_DICTITEM_QUERY_SUCCESS:
          return Object.assign({}, state, {
            itemlist: action.payload.itemlist,
          });
      case GROUPMANAGER_DICTITEM_RANKLIST_QUERY_SUCCESS:
        return Object.assign({}, state, {
            ranklist: action.payload.ranklist,
        });    
      case GROUPMANAGER_DICTITEM_AVALIABLE_QUERY_SUCCESS:
          return Object.assign({},state,{
              attrList: action.payload.attrList,
          });    
      case GROUPMANAGER_DICTITEM_ADD_SUCCESS:
          return Object.assign({},state,{
              addField: action.payload.addField
          }); 
      case GROUPMANAGER_DICTITEM_DELETE_SUCCESS:
          return Object.assign({},state,{
              deleteField: action.payload.deleteField
          });  
      case GROUPMANAGER_DICTITEM_RANK_UPDATE_SUCCESS:
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
      case GROUPMANAGER_DICTITEM_QUERY_FAILURE:
          return Object.assign({}, state, {
              error: action.payload.error
          });
    default:
      return state;
  }
};
