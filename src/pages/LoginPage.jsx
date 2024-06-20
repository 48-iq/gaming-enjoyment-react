import React, {useContext, useState} from 'react';
import '../styles/Login.css';
import BasicInput from "../components/ui/basic-input/BasicInput";
import BasicButton from "../components/ui/basic-button/BasicButton";
import BasicForm from "../components/ui/basic-form/BasicForm";
import {Link, useHistory} from "react-router-dom";
import AuthService from "../services/AuthService";
import {AuthContext} from "../context/context";
import axios from "axios";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/ui/loader/Loader";
import {jwtDecode} from "jwt-decode";
const LoginPage = () => {
    const [loginQuery, setLoginQuery] = useState({
        username: '',
        password: ''
    });
    const {setIsAuth, setToken} = useContext(AuthContext);
    const router = useHistory();
    const login = async (e) => {
        e.preventDefault();
        const response = await AuthService.login(loginQuery);
        if (response.status === 200) {
            localStorage.setItem('access_token', response.data);
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
            setIsAuth(true);
            setToken(jwtDecode(localStorage.getItem('access_token')));
            router.push('/profile');
        }
    }

    const [fetchLogin, isLoading, err] = useFetching(async (e) => {
        await login(e);
    })
    return (
        <div className="LoginPage">
            <BasicForm>
                <BasicInput type="text" placeholder={"Логин"}
                        onChange={e => setLoginQuery({...loginQuery, username: e.target.value})}
                            value={loginQuery.username}
                />
                <BasicInput type="password" placeholder={"Пароль"}
                        onChange={e => setLoginQuery({...loginQuery, password: e.target.value})}
                            value={loginQuery.password}
                />
                <BasicButton
                    onClick={fetchLogin}>Войти</BasicButton>
                <Link to="/register">
                    <BasicButton> К регистрации</BasicButton>
                </Link>
            </BasicForm>
            {isLoading ? <Loader/> : null}
        </div>
    );
};

export default LoginPage;