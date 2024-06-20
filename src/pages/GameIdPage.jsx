import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import BasicHeader from "../components/ui/header/BasicHeader";
import GameService from "../services/GameService";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/ui/loader/Loader";
import gameImage from "../images/game.png";
import PlatformService from "../services/PlatformService";
import GenreService from "../services/GenreService";
import {AuthContext} from "../context/context";
import BasicButton from "../components/ui/basic-button/BasicButton";
import BasicForm from "../components/ui/basic-form/BasicForm";
import BasicInput from "../components/ui/basic-input/BasicInput";
import BasicTextArea from "../components/ui/basic-text-area/BasicTextArea";
import ImageInput from "../components/ui/image-input/ImageInput";
import BasicSelect from "../components/ui/basic-select/BasicSelect";
import ModalWindow from "../components/ui/modal-window/ModalWindow";

const GameIdPage = () => {

    const [modal, setModal] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([]);

    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const params = useParams();

    const router = useHistory();

    const {token} = useContext(AuthContext);

    const [game, setGame] = useState({});

    const [genres, setGenres] = useState([]);

    const [updateGame, setUpdateGame] = useState({
        ...game
    });
    const [platforms, setPlatforms] = useState([]);

    const [selectedGenresFetching, isSelectedGenresLoading, selectedGenresError] = useFetching(async () => {
        const response = await GenreService.getGenresByIds(game.genres);
        setSelectedGenres([...response.data]);
    })

    const [selectedPlatformsFetching, isSelectedPlatformsLoading, selectedPlatformsError] = useFetching(async () => {
        const response = await PlatformService.getPlatformsByIds(game.platforms);
        setSelectedPlatforms([...response.data]);
    })

    const [gameFetching, isGameLoading, gameError] = useFetching(async (id) => {
        console.log(id);
        const response = await GameService.getGame(id)
        setGame(response.data);
        setUpdateGame(response.data);
        platformFetching(game.platforms);
        genreFetching(game.genres);
    });

    const [platformFetching, isPlatformLoading, platformError] = useFetching(async ({ids}) => {
        const response = await PlatformService.getPlatformsByIds(ids);
        setPlatforms([...response]);
    })

    const [genreFetching, isGenreLoading, genreError] = useFetching(async (ids) => {
        const response = await GenreService.getGenresByIds(ids)
        setGenres([...response])
    })

    const [updateFetching, isUpdateLoading, updateError] = useFetching(async (e) => {
        e.preventDefault();
        const sg = selectedGenres.map((genre) => genre.id); //selected Genre
        const sp = selectedPlatforms.map((platform) => platform.id); //selected Platforms
        const g = {...updateGame, genres: sg, platforms: sp};
        const response = await GameService.updateGame(g, params.id);
        setGame(response.data);
        setUpdateGame(response.data);
        setModal(false);
    })

    useEffect(() => {
        gameFetching(params.id);
        selectedGenresFetching();
        selectedPlatformsFetching();

    }, []);

    function readFile(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (() => {
            setUpdateGame({
                ...updateGame,
                image: reader.result
            })
            console.log(reader.result);
        })
    }

    return (
        <div>
            <BasicHeader/>
            {
                isGameLoading || isPlatformLoading || isGenreLoading ? <Loader/>:
                    <div>
                        {
                            game.image ? <img src={game.image} alt={"game"}/> :
                            <img src={gameImage} alt={"game"}/>
                        }
                        <h3>{game.title}</h3>
                        <p>Описание:</p>
                        <div>{game.description}</div>
                        <p>Системные требования:</p>
                        <div>{game.systemRequirements}</div>
                        <div>
                            <p>Жанры:</p>
                            {
                                genres.map((genre) => <div key={genre.id}>{genre.name}</div>)
                            }
                            <p>Платформы:</p>
                            {
                                platforms.map((platform) => <div key={platform.id}>{platform.name}</div>)
                            }
                        </div>
                        {token.role === "ADMIN" ?
                            <div>
                                <BasicButton onClick={() => setModal(true)}>Редактировать</BasicButton>
                                <BasicButton onClick={
                                    async (e) => {
                                        e.preventDefault();
                                        await GameService.deleteGame(game.id);
                                        router.push("/games/all");
                                    }
                                }>Удалить</BasicButton>

                                <ModalWindow isActive={modal} setIsActive={setModal}>
                                    <BasicForm>
                                        <BasicInput value={updateGame.title? updateGame.title : ''} placeholder="название"
                                                    onChange={(e) => setUpdateGame({...updateGame, title: e.target.value})}/>
                                        <BasicTextArea value={updateGame.description? updateGame.description : ''} placeholder="описание"
                                                       onChange={(e) => setUpdateGame({...updateGame, description: e.target.value})}/>
                                        <BasicTextArea value={updateGame.systemRequirements? updateGame.systemRequirements : ''} placeholder="системные требования"
                                                       onChange={(e) => setUpdateGame({...updateGame, systemRequirements: e.target.value})}/>
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

                                        <BasicButton onClick={updateFetching}>Обновить Игру</BasicButton>
                                    </BasicForm>
                                </ModalWindow>
                            </div>: null
                        }
                    </div>
            }
        </div>
    );
};

export default GameIdPage;