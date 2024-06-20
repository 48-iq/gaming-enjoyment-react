import axios from "axios";

export default class UserService {
    static async register (user) {
        const response = await axios.post("http://localhost:8080/auth/register", user);
        return response;
    }

    static async getCurUser() {
        const response = await axios.get("http://localhost:8080/users/current");
        return response;
    }

    static async updateUser(user) {
        const response = await axios.put("http://localhost:8080/users/update", user);
        return response;
    }
}