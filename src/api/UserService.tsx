import axios from "axios";
import { User } from "./dataTypes";

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

    getUserByUsernameDetails(username: string) {
        return axios.get(USER_BASE_URL + "/getByUsernameDetails?username=" + username);
    }

    getUserById(id: string) {
        return axios.get(USER_BASE_URL + "/getUserById/" + id);
    }
    
    putUser = (id: string, data: User) => {
        return axios.put(USER_BASE_URL + "/putUser?userId" + id, data);
    };
}

export default new UserService();