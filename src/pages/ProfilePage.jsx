import React, {useEffect, useState} from 'react';
import BasicHeader from "../components/ui/header/BasicHeader";
import ProfileInfo from "../components/ui/profile-info/ProfileInfo";
import ProfileButtonSection from "../components/ui/profile-button-section/ProfileButtonSection";
import '../styles/Profile.css';
import {useFetching} from "../hooks/useFetching";
import UserService from "../services/UserService";
import LoaderPage from "./LoaderPage";
import Game from "../components/ui/game/Game";

const ProfilePage = () => {
    const [profile, setProfile] = useState({});
    const [fetchUser, isUserLoading, userError] = useFetching(async () => {
        const response = await UserService.getCurUser();
        setProfile(response.data);
    });
        useEffect(() => {
        fetchUser();
    }, []);
    return (
        <div>
            <BasicHeader/>
            <br/>
            {isUserLoading ? <LoaderPage/> :
                <div className="profilePageInfoSection">
                    <ProfileInfo profile={profile}/>
                    <ProfileButtonSection/>
                </div>
            }

        </div>
    );
};

export default ProfilePage;