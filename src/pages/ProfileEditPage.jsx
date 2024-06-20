import React, {useContext, useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import UserService from "../services/UserService";
import LoaderPage from "./LoaderPage";
import ProfileInfo from "../components/ui/profile-info/ProfileInfo";
import BasicHeader from "../components/ui/header/BasicHeader";
import BasicForm from "../components/ui/basic-form/BasicForm";
import BasicInput from "../components/ui/basic-input/BasicInput";
import ImageInput from "../components/ui/image-input/ImageInput";
import BasicSelect from "../components/ui/basic-select/BasicSelect";
import BasicButton from "../components/ui/basic-button/BasicButton";
import {useHistory} from "react-router-dom";
import '../styles/ProfileEdit.css'
import userService from "../services/UserService";
import Game from "../components/ui/game/Game";
import BasicTextArea from "../components/ui/basic-text-area/BasicTextArea";
import {AuthContext} from "../context/context";

const ProfileEditPage = () => {
    const router = useHistory();
    const {token, setToken} = useContext(AuthContext);
    const [profile, setProfile] = useState({});
    const [fetchUser, isUserLoading, userError] = useFetching(async () => {
        const response = await UserService.getCurUser();
        setProfile(response.data);
        setUser({
            ...response.data,
            adminPassword: '',
            password: '',
            image: response.data.image===null|| response.data.image===undefined ? null : response.data.image,
            status: response.data.status===null|| response.data.status===undefined ? '' : response.data.status,
            email: response.data.email===null|| response.data.email===undefined ? '' : response.data.email,
            username: response.data.username===null|| response.data.username===undefined ? '' : response.data.username,
            role: response.data.role===null|| response.data.role===undefined ? 'USER' : response.data.role,
        })
    });

    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        status: '',
        role: 'USER',
        adminPassword: '',
        image: null
    });

    const [confirmPassword, setConfirmPassword] = useState('');
    const [tryPostForm, setTryPostForm] = useState(false);
    useEffect(() => {
        console.log(profile);
        fetchUser();
    }, []);


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

    const [fetchProfileEdit, isLoading, err] = useFetching(async (e) => {
        e.preventDefault();
        setTryPostForm(true);
        const userForUpdate ={
            ...profile
        }
        if (userForUpdate.image !== user.image) {
            userForUpdate.image = profile.image;
        }
        if (userForUpdate.username !== user.username && user.username !== '' && user.username.length >= 3) {
            userForUpdate.username = user.username;
        }
        if (userForUpdate.password !== user.password && user.password !== '' && user.password.length >= 8 && user.password === confirmPassword) {
            userForUpdate.password = user.password;
        }
        if (userForUpdate.email !== user.email && user.email !== '' ) {
            userForUpdate.email = user.email;
        }
        if (userForUpdate.status !== user.status && user.status !== '') {
            userForUpdate.status = user.status;
        }
        if (userForUpdate.role !== user.role && user.role !== '') {
            userForUpdate.role = user.role;
        }
        if (userForUpdate.adminPassword !== user.adminPassword && user.adminPassword !== '' ) {
            userForUpdate.adminPassword = user.adminPassword;
        }
        if (user.password === confirmPassword ){
            const response = await UserService.updateUser(user).then(
                response => {
                    if (response) {
                        setToken({...token, role: response.data.role})
                        router.push('/profile');
                    }
                }
            );
        }

    });

    return (
        <div>
            <BasicHeader/>
            <div>
                {isUserLoading || isLoading? <LoaderPage/> :
                    <div className="profileEditMainSection">
                        <ProfileInfo profile={profile}/>
                        <BasicForm>
                            <BasicInput type="text" placeholder={"Почта"}
                                        value={user.email}
                                        onChange={e => setUser({...user, email: e.target.value})}
                            />
                            <BasicTextArea type="text" placeholder={"Статус"}
                                        value={user.status}
                                        onChange={e => setUser({...user, status: e.target.value})}
                            />
                            <BasicInput type="password" placeholder={"Пароль"}
                                        value={user.password}
                                        onChange={e => setUser({...user, password: e.target.value})}
                            />
                            {user.password.length < 8 && tryPostForm? <p>Пароль должен содержать не менее 8 символов</p> : null}
                            {confirmPassword !== user.password && tryPostForm? <p>Пароли не совпадают</p>: null}
                            <BasicInput type="password" placeholder={"Подтвердите пароль"}
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}/>
                            <ImageInput onChange={e => readFile(e.target.files[0])
                                }>Фото</ImageInput>
                            <BasicSelect
                                onChange={
                                    (e) => {
                                        setIsAdmin(e.target.value === "ADMIN");
                                        setUser({...user, role: e.target.value})
                                    }
                                }
                                value={user.role}
                            >
                                <option disabled={true}>Роль</option>
                                <option >USER</option>
                                <option >ADMIN</option>
                            </BasicSelect>
                            {isAdmin? <BasicInput type="password" placeholder={"Пароль админа"}
                                                  value={user.adminPassword}
                                                  onChange={e => setUser({...user, adminPassword: e.target.value})}
                            /> : null}
                            <BasicButton onClick={fetchProfileEdit}>Редактировать</BasicButton>
                        </BasicForm>
                    </div>
                }
            </div>

            <div>
            </div>
        </div>
    );
};

export default ProfileEditPage;