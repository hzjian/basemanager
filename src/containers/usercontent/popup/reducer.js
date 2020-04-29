import {
    CONTENT_POPUP_PROPS_SAVE_REQUEST,
    CONTENT_POPUP_PROPS_SAVE_SUCCESS,
    CONTENT_MAP_FETCH_PROPS_SUCCESS,
} from '../actionTypes';

const initialState = {
    closeInfoBox: false
};

export default (state = initialState,action) =>{
    switch (action.type){
        case CONTENT_POPUP_PROPS_SAVE_REQUEST:
                return Object.assign({},state,{
                });
        case CONTENT_POPUP_PROPS_SAVE_SUCCESS:
            console.log(action);
            return Object.assign({},state,{
            });
        case CONTENT_MAP_FETCH_PROPS_SUCCESS:
            return Object.assign({}, state, {
                propsdata: action.payload.propsdata,
                options: action.payload.options,
                feaprops: action.payload.feaprops,
                layer: action.payload.layer,
                fealist: action.payload.fealist
            });  
        default:
            return state;    
    }
}