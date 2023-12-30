import { getAccessToken } from "../../helpers/token-helper";

const axiosConfig = {
    withCredentails: true,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
       Authorization: `Bearer ${getAccessToken()}`,
      "ngrok-skip-browser-warning": true
    },
  };
  
export default axiosConfig;