import { callApi }from "../../utils/apiUtils";
import {
    CONTENT_MAP_UPDATE_BOUNDS,
    CONTENT_MAP_FETCH_DATA_REQUEST,CONTENT_MAP_FETCH_DATA_SUCCESS, CONTENT_MAP_FETCH_DATA_FAILURE,
    CONTENT_MAP_FETCH_PROPS_REQUEST,CONTENT_MAP_FETCH_PROPS_SUCCESS,CONTENT_MAP_FETCH_PROPS_FAILURE,
    CONTENT_MAP_SAVE_GEODATA_REQUEST,CONTENT_MAP_SAVE_GEODATA_SUCCESS,CONTENT_MAP_SAVE_GEODATA_FAILURE,
    CONTENT_MAP_CLEAR_SELECTION,
} from "../actionTypes";

export const updateMapBounds = (bounds) => {
  return {
    type: CONTENT_MAP_UPDATE_BOUNDS,
    payload: {
      bounds: bounds
    }
  }
}
export const clearSelection = () =>{
  return {
    type: CONTENT_MAP_CLEAR_SELECTION,
    payload: {
       initMap: true
    }
  }
}


export const fetchLayerData = (queryRange,layerId) => dispatch =>{
    const config ={
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({"queryRange":queryRange,"layerId":layerId})
    }
    const url = "/service/data/query";

    return dispatch(callApi(
        url,
        config,
        () =>{
          return {
              type: CONTENT_MAP_FETCH_DATA_REQUEST,
              payload: {
              }
          };
        },
        (result) => {
          return {
              type: CONTENT_MAP_FETCH_DATA_SUCCESS,
              payload: {
                geoData: result.data,
                layerId:layerId
              }
          };
        },
        (error) => {
          return {
              type: CONTENT_MAP_FETCH_DATA_FAILURE,
              error
          };
        }
    ));
}

//更新图形数据服务接口
export const saveGeoJsonData = (geoJson,featype,taskGuid,feaGuid) => dispatch => {
    const config ={
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({"geoJson":geoJson,"featype":featype,"taskGuid":taskGuid,"feaGuid":feaGuid})
    }
    const url = "/service/busdata/saveData";
    return dispatch(callApi(
        url,
        config,
        () =>{
          return {
              type: CONTENT_MAP_SAVE_GEODATA_REQUEST,
              payload: {
              }
          };
        },
        (result) => {
          return {
              type: CONTENT_MAP_SAVE_GEODATA_SUCCESS,
              payload: {
                propsdata: result.data
              }
          };
        },
        (error) => {
          return {
              type: CONTENT_MAP_SAVE_GEODATA_FAILURE,
              error
          };
        }
    ));
}

export const fetchPropertiesData = (selectLayer,feaprops,options,fealist) => dispatch => {
  const config ={
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({"layerId":options.layerId,"kernelId":feaprops.id})
  }
  const url = "/service/data/props/query";

  return dispatch(callApi(
      url,
      config,
      () =>{
        return {
            type: CONTENT_MAP_FETCH_PROPS_REQUEST,
            payload: {
            }
        };
      },
      (result) => {
        return {
            type: CONTENT_MAP_FETCH_PROPS_SUCCESS,
            payload: {
              propsdata: result.data,
              layer: selectLayer,
              feaprops: feaprops,
              options: options,
              fealist: fealist
            }
        };
      },
      (error) => {
        return {
            type: CONTENT_MAP_FETCH_PROPS_FAILURE,
            error
        };
      }
  ));
}
