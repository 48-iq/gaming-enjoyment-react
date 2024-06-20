import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import GenreService from "../services/GenreService";

const GenresPage = () => {

    const [genres, setGenres] = useState([]);

    const [fetchGenres, isGenresLoading, genresError] = useFetching(async () => {
        const response = await GenreService.getGenres();
        setGenres([...response]);
    });

    useEffect(() => {
        fetchGenres();
    }, []);

    return (
        <div>

        </div>
    );
};

export default GenresPage;