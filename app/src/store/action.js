import { USER_LOGIN_SUCCESS } from "./actionTypes";


export const actionLoginSuccess = data => ({ type: USER_LOGIN_SUCCESS, payload: data });

export const setUserDetails = (requestPayload) =>{
  return dispatch => {
      dispatch(actionLoginSuccess(requestPayload));
  };
};