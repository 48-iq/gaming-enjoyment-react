    import React from 'react';
    import profileDefault from '../../../images/profile-default.png';
    import cl from './profile-info.module.css'
    const ProfileInfo = ({profile}) => {
        return (
            <div className={cl.profileInfo}>
                <div className={cl.profileLeftSection}>
                    <div className={cl.textContainer}><b>{profile.role}:</b></div>
                    <div className={cl.textContainer}>{profile.username}</div>
                    {
                        profile.image === null || profile.image === undefined || profile.image === ''
                            ? <img src={profileDefault} alt="avatar-default" className={cl.profileImage}/>
                            : <img src={profile.image} alt="avatar" className={cl.profileImage}/>

                    }
                </div>
                <div className={cl.profileRightSection}>
                    <div className={cl.textContainer}>
                        <p><b>Статус:</b></p>
                        <p> {profile.status}</p>
                        <br/>
                    </div>
                    <div className={cl.textContainer}>
                        <p><b>Почта:</b></p>
                        <p>{profile.email}</p>
                    </div>
                </div>
            </div>
        );
    };

    export default ProfileInfo;