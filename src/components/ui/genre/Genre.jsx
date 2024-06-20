import React, {useState} from 'react';
import BasicButton from "../basic-button/BasicButton";
import ModalWindow from "../modal-window/ModalWindow";
import {useFetching} from "../../../hooks/useFetching";
import GenreService from "../../../services/GenreService";
import {useHistory} from "react-router-dom";
import BasicInput from "../basic-input/BasicInput";
import BasicTextArea from "../basic-text-area/BasicTextArea";

const Genre = ({genre, setGenre, remove}) => {

    const [modal, setModal] = useState(false);

    const router = useHistory();

    const [updateGenre, setUpdateGenre] = useState({genre});

    const [deleteFetching, isDeleteLoading, deleteError] = useFetching(async (id) => {
        const response = await GenreService.deleteGenre(id);
        if (response.status === 200) {
            setModal(false);
            remove(genre);
        }
    })

    const [updateFetching, isUpdateLoading, updateError] = useFetching(async (e) => {

    })

    return (
        <div>
            <div>
                Title:
                <div>{genre.title}</div>
                Description:
                <div>{genre.description}</div>
            </div>
            <div>
                <BasicButton onClick={(e) => setModal(true)}>Изменить</BasicButton>
                <BasicButton onClick={(e) => deleteFetching(genre.id)}>Удалить</BasicButton>
            </div>
            <ModalWindow isActive={modal} setIsActive={setModal}>
                <BasicInput placeholder="название"></BasicInput>
                <BasicTextArea placeholder="описание"></BasicTextArea>
            </ModalWindow>
        </div>
    );
};

export default Genre;