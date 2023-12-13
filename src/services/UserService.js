import axios from "axios";

const USER_GET_BYEMAIL = "http://localhost:8091/api/users/getUserByEmail";
const USER_GET_BYID = "http://localhost:8091/api/users/getUserById/";

class UserService {
  findUserByEmail(email) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    
    return axios.get(USER_GET_BYEMAIL,email,{ headers });
  }

  findUserById(id) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const url = `${USER_GET_BYID}${id.toString()}`;
    
    return axios.get(url,{ headers });
  }

}

export default new UserService();
    