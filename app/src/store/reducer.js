import { USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE } from "./actionTypes"


const initial_state = {
  loading: 0,
  id: null,
  user_name: null,
  expiry: null,
  photo: null,
  error: null,
  alert: 0,
}

const authReducer = (state = initial_state, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {...action?.payload, loading: 0});
    case USER_LOGIN_FAILURE:
      return Object.assign({}, state, {...action?.payload, loading: 0});
    default:
      return state;
  }
} 

export default authReducer;
