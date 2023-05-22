import { USER_DETAILS_FAIL, USER_DETAILS_SUCCES } from "./actionTypes"


const initial_state = null

const setUserDetails = (state = initial_state, action) => {
  switch (action.type) {
    case USER_DETAILS_SUCCES:
      return Object.assign({}, state, action?.payload);
    case USER_DETAILS_FAIL:
      return Object.assign({}, state, action?.payload);
    default:
      return state;
  }
} 

export default setUserDetails;
