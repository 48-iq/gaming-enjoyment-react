import React, {useContext, useEffect, useRef, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import GameService from "../services/GameService";
import {useObserver} from "../hooks/useObserver";
import {AuthContext} from "../context/context";
import BasicButton from "../components/ui/basic-button/BasicButton";
import Game from "../components/ui/game/Game";
import ModalWindow from "../components/ui/modal-window/ModalWindow";
import BasicForm from "../components/ui/basic-form/BasicForm";
import BasicInput from "../components/ui/basic-input/BasicInput";
import BasicTextArea from "../components/ui/basic-text-area/BasicTextArea";
import ImageInput from "../components/ui/image-input/ImageInput";
import BasicSelect from "../components/ui/basic-select/BasicSelect";
import '../styles/Games.css'
import BasicHeader from "../components/ui/header/BasicHeader";
import GamesAdminButtonPanel from "../components/ui/games-admin-button-panel/GamesAdminButtonPanel";


const GamesPage = () => {
    const lastElement = useRef();

    const [newGame, setNewGame] = useState({});

    const [modal, setModal] = useState(false);

    const {token} = useContext(AuthContext);

    const [genres, setGenres] = useState([]);
    const [platforms, setPlatforms] = useState([]);

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);

    const [fetchGenres, isGenresLoading, genresError] = useFetching(async () => {
        const response = await GameService.getGenres();
        setGenres([...response]);
    })

    const [fetchPlatforms, isPlatformsLoading, platformsError] = useFetching(async () => {
        const response = await GameService.getPlatforms();
        setPlatforms([...response]);
    })

    const [games, setGames] = useState([]);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [gamesFetching, isGamesLoading, gamesError] = useFetching( async (page) => {
            const response = await GameService.getGames({page: page, size: 10});
            setGames([...games, ...response.data.content]);
            setTotalPages(response.page.totalPages);
        }
    )

    const [createFetching, isCreateLoading, createError] = useFetching( async (e) => {
            e.preventDefault();
            const sg = selectedGenres.map((genre) => genre.id); //selected Genre
            const sp = selectedPlatforms.map((platform) => platform.id); //selected Platforms

            const g = {...newGame, genres: sg, platforms: sp};
            console.log(g);
            const response = await GameService.createGame(g);
            if (response) {
                if (response.status === 200) {
                    setGames([...games,response.data]);
                }
                setModal(false);
            }
        }
    )

    useObserver(lastElement, page < totalPages, isGamesLoading, () => {
        setPage(page + 1);
    });


    useEffect(() => {
        fetchGenres();
        fetchPlatforms();
    }, []);

    useEffect(() => {
        gamesFetching(page);
    }, [page, totalPages]);

    function readFile(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (() => {
            setNewGame({
                ...newGame,
                image: reader.result
            })
            console.log(reader.result);
        })
    }

    return (
        <div>
            <BasicHeader/>
            {token.role==='ADMIN' ? <div>
                <GamesAdminButtonPanel/>
                <br/>
                <div className="byRow">
                    <BasicButton onClick={() => setModal(true)}>Добавить Игру</BasicButton>
                </div>
            </div>:null}
            <ModalWindow isActive={modal} setIsActive={setModal}>
                <BasicForm>
                    <BasicInput placeholder="название"
                                onChange={(e) => setNewGame({...newGame, title: e.target.value})}/>
                    <BasicTextArea placeholder="описание"
                                   onChange={(e) => setNewGame({...newGame, description: e.target.value})}/>
                    <BasicTextArea placeholder="системные требования"
                                   onChange={(e) => setNewGame({...newGame, systemRequirements: e.target.value})}/>
                    <ImageInput onChange={e => readFile(e.target.files[0])}>Логотип</ImageInput>
                    <div className="optionListDiv">
                        {selectedGenres.map((genre) =>
                            <div key={genre.id} onClick={(e) =>
                                setSelectedGenres([...selectedGenres].filter((g) => g.id !== genre.id))}>{genre.title}</div>
                        )}
                    </div>
                    <p>Жанры</p>
                    <BasicSelect onChange={(e) => {
                        if (!selectedGenres.includes(e.target.value))
                            setSelectedGenres([...selectedGenres, genres.filter((g) => g.title === e.target.value)[0]]);
                    }}>
                        {genres.map((genre) =>
                            <select>{genre.title}</select>
                        )}
                    </BasicSelect>

                    <div className="optionListDiv">
                        {selectedPlatforms.map((platform) =>
                            <div key={platform.id} onClick={(e) =>
                                setSelectedPlatforms([...selectedPlatforms].filter((p) => p.id !== platform.id))}>{platform.title}</div>
                        )}
                    </div>
                    <div>Платформы</div>
                    <BasicSelect onChange={(e) => {
                        if (!selectedPlatforms.includes(e.target.value))
                            setSelectedGenres([...selectedPlatforms, platforms.filter((g) => g.title === e.target.value)[0]]);
                    }}>
                        {platforms.map((platform) =>
                            <select>{platform.title}</select>
                        )}
                    </BasicSelect>

                    <BasicButton onClick={createFetching}>Добавить Игру</BasicButton>
                </BasicForm>
            </ModalWindow>
            <div>
                {games.map((game) =>
                    <div key={game.id} className="byRow">
                        <Game game={game}/>
                        <div className="byColumn">
                            <BasicButton>Добавить в "Играл"</BasicButton>
                            <BasicButton>Добавить в "Играю"</BasicButton>
                        </div>
                    </div>
                )}
            </div>
            <div ref={lastElement}></div>
        </div>
    );
};

export default GamesPage;