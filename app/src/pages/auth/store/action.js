import { LOGIN, SIGN_UP, RESET, FORGOT, OTP, REGISTER_USER, ALERT } from "./actionTypes";
import axios from "axios";
import { OTP_VERIFY, USER_SIGNIN_URL, USER_LOGIN_URL } from "../../../utils/apis";
import { USER_LOGIN_SUCCESS } from '../../../store/actionTypes';
import axiosConfig from "../../../utils/axios_config";

export const switchCurrentState = (requestPayload) => {
  return dispatch => {
    switch (requestPayload.type) {
      case LOGIN:
        return dispatch({ type: LOGIN, payload: { isLogin: 'Login' } });
      case SIGN_UP:
        return dispatch({ type: SIGN_UP, payload: { isLogin: 'SignUp' }});
      case RESET:
        return dispatch({ type: RESET, payload: { isLogin: 'Reset' } });
      case FORGOT:
        return dispatch({ type: FORGOT, payload: { isLogin: 'Forgot' } });
      case OTP:
        return dispatch({ type: OTP, payload: { isLogin: 'Otp' } });
      default:
        return '';
    };
  };
}

export const switchAlert = (requestPayload) => {
  return dispatch => {
    return dispatch({ type: ALERT, payload: requestPayload.payload});
  };
}

export const register_user = (requestPayload) => {
  return dispatch => {
    axios
      .post(USER_SIGNIN_URL, requestPayload, axiosConfig)
      .then(response => {
        console.log('SIGN IN user success', response);
        dispatch({ type: ALERT, payload: { isLogin: 'Otp', alert:1, type: 'success', message:  response?.data?.message } })
        setTimeout(()=> {
          dispatch({ type: ALERT, payload: { alert:0, type: 'success', message:  response?.data?.message } })
        }, 5000);
      })
      .catch(err => {
        dispatch({ type: ALERT, payload: { alert:1, type: 'error', message: "Internal server error" } })
        console.log('SIGN IN user error', err);
      });
  };
}

export const verifyOtp = (requestPayload) => {
  return dispatch => {
    axios
      .post(OTP_VERIFY, requestPayload, axiosConfig)
      .then(response => {
        console.log('VERIFY OTP SUCCESS', response);
        dispatch({ type: ALERT, payload: { isLogin: 'Login', alert:1, type: 'success', message:  response?.data?.message } })
        setTimeout(()=> {
          dispatch({ type: ALERT, payload: { alert:0, type: 'success', message:  response?.data?.message } })
        }, 5000);
      })
      .catch(err => {
        dispatch({ type: ALERT, payload: { alert:1, type: 'error', message: err?.message } })
        console.log('VERIFY OTP ERROR', err);
      });
  };
}

export const loginUser = (requestPayload) => {
  return dispatch => {
    axios
      .post(USER_LOGIN_URL, requestPayload, axiosConfig)
      .then(response => {
        console.log('LOGIN SUCCESS', response);
        sessionStorage.setItem('authDetails', JSON.stringify(response?.data));
        const temp = { 
          user_name: response?.data?.data?.user_name,
          id: response?.data?.data?.id,
          expiry: response?.data?.data?.expiry,
          photo: response?.data?.data?.photo,
         };
        dispatch({ type: USER_LOGIN_SUCCESS, payload: temp })
        window.location = '/';
      })
      .catch(err => {
        dispatch({ type: ALERT, payload: { alert:1, type: 'error', message: err?.message } })
        console.log('VERIFY OTP ERROR', err);
      });
  };
}
