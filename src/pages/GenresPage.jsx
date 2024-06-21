import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import GenreService from "../services/GenreService";
import {useHistory} from "react-router-dom";
import BasicButton from "../components/ui/basic-button/BasicButton";
import ModalWindow from "../components/ui/modal-window/ModalWindow";
import BasicInput from "../components/ui/basic-input/BasicInput";
import BasicTextArea from "../components/ui/basic-text-area/BasicTextArea";
import Genre from "../components/ui/genre/Genre";
import '../styles/Genres.css'
import BasicHeader from "../components/ui/header/BasicHeader";
import GamesAdminButtonPanel from "../components/ui/games-admin-button-panel/GamesAdminButtonPanel";

const GenresPage = () => {

    const [genres, setGenres] = useState([]);

    const [newGenre, setNewGenre] = useState({
        title: '',
        description: '',
    });

    const [fetchGenres, isGenresLoading, genresError] = useFetching(async () => {
        const response = await GenreService.getGenres();
        setGenres([...response.data]);
        console.log(response.data)
    });

    const [modal, setModal] = useState(false);

    const [deleteFetching, isDeleteLoading, deleteError] = useFetching(async (id) => {
        const response = await GenreService.deleteGenre(id);
        fetchGenres();
    })

    const [createFetching, isCreateLoading, createError] = useFetching(async (genre) => {
        const response = await GenreService.createGenre(genre);
        if (response.status === 200) {
            setGenres([...genres, response.data]);
            setModal(false);
            setNewGenre({title: '', description: ''});
        }
    })

    useEffect(() => {
        fetchGenres();
    }, []);

    return (
        <div>
            <BasicHeader/>
            <GamesAdminButtonPanel/>
            <BasicButton onClick={() => setModal(true)}>Добавить</BasicButton>
            {
                genres.map((genre) =>
                <div key={genre.id} className="byRow">
                    <Genre genre={genre}/>
                    <BasicButton onClick={() => deleteFetching(genre.id)}>Удалить</BasicButton>
                </div>)
            }
            <ModalWindow isActive={modal} setIsActive={setModal}>
                <div className="byColumn">
                    <BasicInput placeholder="название"
                                value = {newGenre.title}
                                onChange={(e) => setNewGenre({...newGenre, title: e.target.value})}/>
                    <BasicTextArea placeholder="описание"
                                   value = {newGenre.description}
                                   onChange={(e) => setNewGenre({...newGenre, description: e.target.value})}>
                    </BasicTextArea>
                    <BasicButton onClick={() => createFetching(newGenre)}>Добавить</BasicButton>
                </div>
            </ModalWindow>

        </div>
    );
};

export default GenresPage;