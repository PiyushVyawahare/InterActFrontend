import { SIGN_UP, LOGIN, FORGOT, RESET, OTP, REGISTER_USER, ALERT } from "./actionTypes"


const initial_state = {
  isLogin: 'Login',
  alert: 0,
  type: 'error',
  message: 'message',
}

const LoginReducer = (state = initial_state, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {...action?.payload, loading: 0});
    case SIGN_UP:
      return Object.assign({}, state, {...action?.payload, loading: 0});
    case RESET:
        return Object.assign({}, state, {...action?.payload, loading: 0});
    case FORGOT:
      return Object.assign({}, state, {...action?.payload, loading: 0});
    case OTP:
      return Object.assign({}, state, {...action?.payload, loading: 0});
    case REGISTER_USER:
      return Object.assign({}, state, {...action?.payload, loading: 0});
    case ALERT:
      return Object.assign({}, state, {...action?.payload, loading: 0});
    default:
      return state;
  }
} 

export default LoginReducer;
