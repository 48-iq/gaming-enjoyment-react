import React from 'react';
import BasicButton from "../basic-button/BasicButton";
import cl from './game-admin-button-panel.module.css'
import {Link} from "react-router-dom";
const GamesAdminButtonPanel = () => {
    return (
        <div className={cl.gameAdminButtonPanel}>
            <Link to="/games/all"><BasicButton>Игры</BasicButton></Link>
            <Link to="/genres/all"><BasicButton>Жанры</BasicButton></Link>
            <BasicButton>Платформы</BasicButton>
        </div>
    );
};

export default GamesAdminButtonPanel;