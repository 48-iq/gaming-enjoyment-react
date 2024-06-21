import React, {useEffect, useRef, useState} from 'react';
import BasicHeader from "../components/ui/header/BasicHeader";
import {useFetching} from "../hooks/useFetching";
import UserService from "../services/UserService";
import Loader from "../components/ui/loader/Loader";
import {useObserver} from "../hooks/useObserver";
import Game from "../components/ui/game/Game";
import BasicButton from "../components/ui/basic-button/BasicButton";
import '../styles/GamesPlayedList.css'
import GameService from "../services/GameService";

const GamesPlayedList = () => {
    const [user, setUser] = useState({});

    const lastElement = useRef();

    const [fetchUser, isUserLoading, userError] = useFetching(async () => {
        const response = await UserService.getCurUser();
        setUser(response.data);
        const gamesResponse = await GameService.getUserPlayedGames({userId: response.data.id, page: page, size: 10});
        setGames([...gamesResponse.data.content]);
        setTotalPages(response.data.page.totalPages);
    });

    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [games, setGames] = useState([]);

    const [deleteFromPlayingFetching, deleteFromPlayingLoading, deleteFromPlayingError] = useFetching(async (id) => {
        const response = await UserService.getCurUser();
        const updateUser = response.data;
        updateUser.gamesPlayed = [...updateUser.gamesPlayed.filter((game) => game !== id)];
        console.log(id)
        console.log(updateUser.gamesPlayed);
        const respose = await UserService.updateUser(updateUser);
        fetchUser();
    })


    useEffect(() => {
        fetchUser();
    }, [page]);

    useObserver(lastElement, page < totalPages, isUserLoading, () => {
        setPage(page + 1);
    });

    return (
        <div>
            <BasicHeader/>
            {isUserLoading ? <Loader/> : null}

            {
                games.map((game) =>
                    <div key={game.id} className="gamesRow">
                        <Game game={game}/>
                        <BasicButton onClick={() => deleteFromPlayingFetching(game.id)}>Удалить</BasicButton>
                    </div>)
            }

            <div ref={lastElement} />
        </div>
    );
};

export default GamesPlayedList;