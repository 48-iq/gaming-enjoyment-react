import React, {useEffect, useRef, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import UserService from "../services/UserService";
import {useObserver} from "../hooks/useObserver";
import BasicHeader from "../components/ui/header/BasicHeader";
import Loader from "../components/ui/loader/Loader";
import Game from "../components/ui/game/Game";
import BasicButton from "../components/ui/basic-button/BasicButton";

const GamesPlayingList = () => {
    const [user, setUser] = useState({});

    const lastElement = useRef();

    const [fetchUser, isUserLoading, userError] = useFetching(async () => {
        const response = await UserService.getCurUser();
        setUser(response.data);
    });

    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [games, setGames] = useState([]);


    const [fetchGames, isGamesLoading, err] = useFetching(async (page) => {
        const response = await UserService.getUserPlayingGames({userId: user.id, page: page, size: 10});
        setGames([...games, ...response.content]);
        setTotalPages(response.page.totalPages);
    });


    useEffect(() => {
        fetchUser();
        fetchGames(page);
    }, [page, totalPages]);

    useObserver(lastElement, page < totalPages, isGamesLoading, () => {
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
                        <BasicButton>Удалить</BasicButton>
                    </div>)
            }

            <div ref={lastElement} />
        </div>
    );
};

export default GamesPlayingList;