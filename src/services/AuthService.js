import {useContext} from "react";
import {AuthContext} from "../context/context";
import axios from "axios";


export default class AuthService {
    static async login(loginQuery) {
        const response = await axios.post("http://localhost:8080/auth/login",
            loginQuery);
        console.log(response)
        return response;
    }
    static async logout() {
        const response = await axios.get("http://localhost:8080/auth/logout");
        return response;
    }

}