import {
    CONTENT_MAP_TASK_QUERY_TASKLIST_REQUEST,CONTENT_MAP_TASK_QUERY_TASKLIST_SUCCESS,CONTENT_MAP_TASK_QUERY_TASKLIST_FAILURE,
    CONTENT_MAP_TASK_OPEN_TASK_REQUEST,CONTENT_MAP_TASK_OPEN_TASK_SUCCESS,CONTENT_MAP_TASK_OPEN_TASK_FAILURE,
    CONTENT_POPUP_DATA_DELETE_SUCCESS,
    CONTENT_MAP_TASK_CLOSE_TASK_REQUEST,
    CONTENT_POPUP_ANNO_SAVE_SUCCESS
  } from '../../../actionTypes';

const initialState = {

};

export default (state = initialState,action) =>{
    switch (action.type){
        case CONTENT_MAP_TASK_QUERY_TASKLIST_SUCCESS:
            return Object.assign({},state,{
                taskList: action.payload.taskList,
                totalCount: action.payload.totalCount
            });
        case CONTENT_MAP_TASK_OPEN_TASK_SUCCESS:
            return Object.assign({},state,{
                layerList: action.payload.layerList,
                taskId: action.payload.taskId
            });    
        case CONTENT_MAP_TASK_CLOSE_TASK_REQUEST:
            return Object.assign({},state,{
                layerList: action.payload.layerList,
                taskId: action.payload.taskId
            }); 
        case CONTENT_POPUP_DATA_DELETE_SUCCESS:
            let tempLayerList = state.layerList.map((layer) =>{
                if( layer.layerId === action.payload.layerId && layer.geoData && layer.geoData.length>0)
                {
                    layer.geoData.map((geometry,index) => {
                        if(geometry.properties.id === action.payload.kernelId)
                        {
                            layer.geoData.splice(index,1);
                        }
                    });
                }
                return layer;
            });
            return Object.assign({},state,{
                layerList: tempLayerList,
            }); 
        case CONTENT_POPUP_ANNO_SAVE_SUCCESS:
            return Object.assign({},state,{
                layerList: state.layerList.map((layer) =>{
                    if( layer.layerId === action.payload.layerId && layer.geoData && layer.geoData.length>0)
                    {
                        layer.geoData.map((geometry) => {
                            if(geometry.properties.id === action.payload.kernelId)
                            {
                                //action.payload.anno
                                geometry.properties.anno = action.payload.anno;
                            }
                            return geometry;
                        });
                    }
                    return layer;
                })
            });
        default:
            return state;    
    }
}