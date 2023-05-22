import { USER_DETAILS_FAIL, USER_DETAILS_SUCCES } from "./actionTypes"


export const actionUserDetailsSuccess = (data) =>{ 
  return {
    type: USER_DETAILS_SUCCES,
    payload: data
  }
}

export const actionUserDetailsFail = (data) => {
  return {
    type: USER_DETAILS_FAIL,
    payload: data
  }
}

export const getUserDetails = () =>{
  return dispatch => {
    const userDetails = sessionStorage.getItem("interactToken");
    // if(userDetails){  
    //   const data = {
    //       isAuthorized: true,
    //       username: response.username,
    //       userprofile: response.userprofile
    //     }
    //   dispatch(actionUserDetailsSuccess(data))
    // }
    // else
    if(!userDetails)dispatch(actionUserDetailsFail({isAuthorized: false}));
  }
}