/* jshint esversion: 6 */
import {
  CONTENT_MAP_UPDATE_BOUNDS,
  CONTENT_MAP_FETCH_DATA_REQUEST,CONTENT_MAP_FETCH_DATA_SUCCESS, CONTENT_MAP_FETCH_DATA_FAILURE,
  CONTENT_MAP_FETCH_PROPS_REQUEST,CONTENT_MAP_FETCH_PROPS_SUCCESS,CONTENT_MAP_FETCH_PROPS_FAILURE,
  CONTENT_POPUP_DATA_DELETE_SUCCESS,
  CONTENT_MAP_CLEAR_SELECTION,
  CONTENT_POPUP_CLOSE_INFOBOX,
  CONTENT_MAP_TASK_OPEN_TASK_SUCCESS,
  CONTENT_MAP_TASK_CLOSE_TASK_REQUEST

} from "../actionTypes";


const initialState = {
  updateMap:false,
};

export default ( state = initialState, action)  => {
  switch (action.type) {
    case CONTENT_MAP_FETCH_DATA_SUCCESS:
      return Object.assign({}, state, {
        geoData: action.payload.geoData,
        layerId:action.payload.layerId,
        updateMap:true,
      });
    case CONTENT_MAP_FETCH_DATA_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });
    case CONTENT_MAP_FETCH_PROPS_SUCCESS:
        return Object.assign({}, state, {
          openPop:true
        });  
    case CONTENT_MAP_UPDATE_BOUNDS:
      return Object.assign({}, state, {
        bounds: action.payload.bounds,
        updateMap: false,
      });  
    case CONTENT_MAP_CLEAR_SELECTION:
      return Object.assign({},state,{
        initMap: action.payload.initMap,
        openPop:false,
      }); 
    case CONTENT_POPUP_CLOSE_INFOBOX:
      return   Object.assign({},state,{
        openPop:false,
      }); 
    case CONTENT_POPUP_DATA_DELETE_SUCCESS:
      return   Object.assign({},state,{
        openPop:false,
      });   
    case CONTENT_MAP_TASK_OPEN_TASK_SUCCESS:
      return Object.assign({},state,{
          layerList: action.payload.layerList,
          taskId: action.payload.taskId,
          updateMap:true,
      });  
    case CONTENT_MAP_TASK_CLOSE_TASK_REQUEST:
        return Object.assign({},state,{
          layerList: [],
          taskId: null,
          updateMap:true,
      });                
    default:
      return state;
  }
}
