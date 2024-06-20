import React from 'react';
import BasicButton from "../basic-button/BasicButton";
import cl from './game-admin-button-panel.module.css'
const GamesAdminButtonPanel = () => {
    return (
        <div className={cl.gameAdminButtonPanel}>
            <BasicButton>Игры</BasicButton>
            <BasicButton>Жанры</BasicButton>
            <BasicButton>Платформы</BasicButton>
        </div>
    );
};

export default GamesAdminButtonPanel;