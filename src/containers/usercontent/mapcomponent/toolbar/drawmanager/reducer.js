import {
    CONTENT_MAP_DRAWMANAGER_SAVE_KERNEL_REQUEST,CONTENT_MAP_DRAWMANAGER_SAVE_KERNEL_SUCCESS,CONTENT_MAP_DRAWMANAGER_SAVE_KERNEL_FAILURE
  } from '../../../actionTypes';

const initialState = {

};

export default (state = initialState,action) =>{
    switch (action.type){
        case CONTENT_MAP_DRAWMANAGER_SAVE_KERNEL_SUCCESS:
            return Object.assign({},state,{
                saveResult: action.payload.saveResult,
                layerId:action.payload.layerId,
                geoJson:action.payload.geoJson,
            });
 
        default:
            return state;    
    }
}