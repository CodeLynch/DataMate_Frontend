import axios from "axios";

const USER_BASE_URL = "http://localhost:8080/user"

const config = {
    headers:{
        "Content-Type": "multipart/form-data"
    }
}

class UserService {

    postUser(data: FormData, userImage?: File){
        return axios.post(USER_BASE_URL + "/postUser",data, config);
    }

    getUserByUsername(username: string) {
        return axios.get(USER_BASE_URL + "/getByUsername?username=" + username);
    }

}

export default new UserService();