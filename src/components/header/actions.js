/* jshint esversion: 6 */
import {
  CONNECT_SUCCESS,
  CONNECT_ERROR,
  ALERT,
  DISMISS
} from './actionTypes';


export const connectSuccess = () =>dispatch => {
  return {
    type: CONNECT_SUCCESS
  };
}

export const connectError = () =>dispatch =>  {
  return {
    type: CONNECT_ERROR
  };
}

export const alert = (payload)  =>dispatch =>{
  return {
    type: ALERT,
    payload
  };
}

export const dismiss = () =>dispatch =>  {
  return {
    type: DISMISS
  };
};
