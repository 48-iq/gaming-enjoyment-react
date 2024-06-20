import React, {useContext} from 'react';

import cl from './basic-header.module.css';
import BasicButton from "../basic-button/BasicButton";
import AuthService from "../../../services/AuthService";
import {AuthContext} from "../../../context/context";
import {Link, useHistory} from "react-router-dom";
const BasicHeader = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const router = useHistory();
    const logout = async () => {
        localStorage.removeItem('access_token');;
        setIsAuth(false);
        router.push('/login')
    }
    return (
        <header className={cl.basicHeader}>
            <div className={cl.topSection}>
                <div className={cl.logo}>Gaming Enjoyment</div>
                <BasicButton onClick={logout}>
                    Выход
                </BasicButton>
            </div>
            <div className={cl.botSection}>
                <Link to="/profile"><BasicButton>Профиль</BasicButton></Link>
                <BasicButton>Сообщения</BasicButton>
                <BasicButton>Группы</BasicButton>
                <BasicButton>Лента</BasicButton>
                <BasicButton>Друзья</BasicButton>
                <BasicButton>Форум</BasicButton>
                <Link to="/games/all"><BasicButton>Игры</BasicButton></Link>
            </div>
        </header>
    );
};

export default BasicHeader;