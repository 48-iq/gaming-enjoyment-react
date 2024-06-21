import React from 'react';
import gameImage from '../../../images/game.png';
import {Link, useHistory} from "react-router-dom";
import BasicButton from "../basic-button/BasicButton";
import cl from './game.module.css'
const Game = ({game}) => {
    const router = useHistory();
    return (
        <div className={cl.game}>
            {game.image === null || game.image === undefined || game.image === ''?
                <img src={gameImage} alt="game" className={cl.image}/>:
                <img src={game.image} alt="game" className={cl.image}/>}
            <div>{game.title}</div>
            <BasicButton onClick={() => router.push(`/games/${game.id}`)}>к игре</BasicButton>
        </div>
    );
};

export default Game;