import {
  callApi,
  ID_TOKEN,
  loadIdToken,
  setIdToken,
  removeIdToken,
  decodeUserProfile
} from "../utils/apiUtils";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from './actionTypes';




function loginRequest(user) {
  return {
    type: LOGIN_REQUEST,
    user
  };
}

function loginSuccess(payload) {
  const data =  payload.data;
  const idToken = data[ID_TOKEN];
  setIdToken(idToken);
  const profile = decodeUserProfile(idToken);
  return {
    type: LOGIN_SUCCESS,
    user: profile.sub,
    role: profile.scope
  };
}

function loginFailure(error) {
  removeIdToken();
  return {
    type: LOGIN_FAILURE,
    error
  };
}

export function login(userName, userPassword) {
  const config = {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userName,
      userPassword
    })
  };

  return callApi(
    "/service/auth/login",
    config,
    loginRequest(userName),
    loginSuccess,
    loginFailure
  );
}

function logoutRequest(user) {
  removeIdToken();
  return {
    type: LOGOUT_REQUEST,
    user
  };
}

function logoutSuccess(payload) {
  removeIdToken();
  return {
    type: LOGOUT_SUCCESS,
    user: payload.user
  };
}

function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    error
  };
}

export function logout(user) {
  const idToken = loadIdToken();
  const config = {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": `gamma.tl.${idToken}`
    },
    body: JSON.stringify({
      user
    })
  };

  return callApi(
    "/service/auth/login",
    config,
    logoutRequest,
    logoutSuccess,
    logoutFailure
  );
}
