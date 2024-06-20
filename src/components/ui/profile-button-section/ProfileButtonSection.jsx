import React from 'react';
import BasicButton from "../basic-button/BasicButton";
import cl from './profile-button-section.module.css'
import {Link} from "react-router-dom";
const ProfileButtonSection = () => {
    return (
        <div className={cl.profileButtonSection}>
            <Link to="/profile/games/played"><BasicButton>Играл</BasicButton></Link>
            <BasicButton>Играю</BasicButton>
            <Link to="/profile/edit"><BasicButton>Редактировать профиль</BasicButton></Link>
        </div>
    );
};

export default ProfileButtonSection;