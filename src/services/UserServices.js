import axios from "axios";
const USER_GET_BYID = "https://tecsuptampusfront-production.up.railway.app/api/users/getUserById/";

class UserServices {

  async findUserById(id) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = `${USER_GET_BYID}${id.toString()}`
    return axios.get(url,  { headers })
      .catch((error) => {
        console.error(error)
      });
  }


}

export default new UserServices();
    