import React, {useState} from 'react';
import BasicButton from "../basic-button/BasicButton";
import ModalWindow from "../modal-window/ModalWindow";
import {useFetching} from "../../../hooks/useFetching";
import GenreService from "../../../services/GenreService";
import {useHistory} from "react-router-dom";
import BasicInput from "../basic-input/BasicInput";
import BasicTextArea from "../basic-text-area/BasicTextArea";

const Genre = ({genre}) => {



    return (
        <div>
            <div>
                Title:
                <div>{genre.title}</div>
                Description:
                <div>{genre.description}</div>
            </div>

        </div>
    );
};

export default Genre;