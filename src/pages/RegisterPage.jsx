import React, {useEffect, useState} from 'react';
import BasicInput from "../components/ui/basic-input/BasicInput";
import BasicButton from "../components/ui/basic-button/BasicButton";
import BasicForm from "../components/ui/basic-form/BasicForm";
import '../styles/Register.css'
import BasicSelect from "../components/ui/basic-select/BasicSelect";
import ImageInput from "../components/ui/image-input/ImageInput";
import {Link, useHistory, useNavigate} from "react-router-dom";
import UserService from "../services/UserService";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/ui/loader/Loader";
const RegisterPage = () => {
    const router = useHistory();
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        role: 'USER',
        adminPassword: '',
        image: ''
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [tryPostForm, setTryPostForm] = useState(false);

    function readFile(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (() => {
            setUser({
                ...user,
                image: reader.result
            })
            console.log(reader.result);
        })
    }

    const register = async (e) => {
        e.preventDefault();
        setTryPostForm(true);
        if (user.password === confirmPassword
            && user.username.length >= 3
            && user.password.length >= 8
        ) {
            const response = await UserService.register(user);
            if (response) {
                router.push('/login');
            }
        }
    }

    const [fetchRegister, isLoading, err] = useFetching(async (e) => {
        await register(e);
    })

    useEffect(() => {
        localStorage.removeItem("access_token");
    }, []);


    return (
        <div className="RegisterPage">
            <BasicForm>
                <BasicInput type="text" placeholder={"Логин"}
                            onChange={e => setUser({...user, username: e.target.value})}
                />
                {user.username.length < 3 && tryPostForm? <p>Логин должен содержать не менее 3 символов</p> : null}
                <BasicInput type="text" placeholder={"Почта"}
                            onChange={e => setUser({...user, email: e.target.value})}
                />
                <BasicInput type="password" placeholder={"Пароль"}
                            onChange={e => setUser({...user, password: e.target.value})}
                />
                {user.password.length < 8 && tryPostForm? <p>Пароль должен содержать не менее 8 символов</p> : null}
                {confirmPassword !== user.password && tryPostForm? <p>Пароли не совпадают</p>: null}
                <BasicInput type="password" placeholder={"Подтвердите пароль"} onChange={e => setConfirmPassword(e.target.value)}/>
                <ImageInput onChange={e => readFile(e.target.files[0])
                    }>Фото</ImageInput>
                <BasicSelect
                    onChange={
                        (e) => {
                            setIsAdmin(e.target.value === "ADMIN");
                            setUser({...user, role: e.target.value})
                        }
                    }
                >
                    <option disabled={true}>Роль</option>
                    <option >USER</option>
                    <option >ADMIN</option>
                </BasicSelect>
                {isAdmin? <BasicInput type="password" placeholder={"Пароль админа"}
                            onChange={e => setUser({...user, adminPassword: e.target.value})}
                /> : null}
                <BasicButton onClick={fetchRegister}>Зарегистрироваться</BasicButton>
                <Link to="/login">
                    <BasicButton> Ко входу</BasicButton>
                </Link>
            </BasicForm>
            {isLoading? <Loader/> : null}
        </div>
    );
};

export default RegisterPage;