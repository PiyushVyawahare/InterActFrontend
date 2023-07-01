import { getAccessToken } from "../../helpers/token-helper";

const axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
       Authorization: `Bearer ${getAccessToken()}`,
    },
  };
  
export default axiosConfig;