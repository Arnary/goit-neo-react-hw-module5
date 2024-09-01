import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchCastDetail } from "../../tmdb-api";
import css from "./MovieCast.module.css";


const MovieCast = () => {
    const { movieId } = useParams();
    const [movieCast, setMovieCast] = useState();

    useEffect(() => {
        async function fetchCast() {
            try {
                const response = await fetchCastDetail(movieId);
                setMovieCast(response.cast);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCast();
    }, [movieId]);

    return (
        <ul className={css["cast-list"]}>
            {movieCast?.map(cast => {
                return (
                    <li key={cast.id} >
                        <img className={css["actor-pic"]} src={`https://image.tmdb.org/t/p/original${cast.profile_path}`} alt={cast.name} />
                        <p>{cast.name}</p>
                        <p>Character: {cast.character}</p>
                    </li>
                )
            })}
        </ul>
    )
};

export default MovieCast;
