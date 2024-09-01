import { HiMiniArrowLeft } from "react-icons/hi2";
import { Link, Outlet, useParams, useNavigate, useLocation} from "react-router-dom";
import { fetchMovieDetail } from "../../tmdb-api";
import { useState, useEffect } from "react";
import css from "./MovieDetailsPage.module.css";


const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [details, setDetail] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchDetail() {
            try {
                const response = await fetchMovieDetail(movieId);
                setDetail(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDetail();
    }, [movieId]);

    const prevLocation = location.state || "/movies";
    const year = details.hasOwnProperty("release_date") ? details.release_date.slice(0, 4) : "";

    return (
        <>
            <button onClick={() => navigate(prevLocation)} className={css["back-button"]}><HiMiniArrowLeft />Go back</button>
            <div className={css["details-container"]}>
                <div className={css.poster}>
                    <img src={`https://image.tmdb.org/t/p/w300/${details.poster_path}`} alt="poster" />
                </div>
                <div className={css["detail-info"]}>
                    <h1>{details.title} ({year})</h1>
                    <p>User score: {Math.round(details.vote_average * 10)}%</p>
                    <h2>Overview</h2>
                    <p>{details.overview}</p>
                    <h2>Genres</h2>
                    <div className={css.genres}>
                        {details.genres?.map(genre => {
                            return (
                                <p key={genre.id}>{genre.name}</p>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className={css["additional-info"]}>
                <h3 className={css["additional-title"]}>Additional information</h3>
                <li className={css["additional-item"]}>
                    <Link to="cast" state={prevLocation}>Cast</Link>
                </li>
                <li className={css["additional-item"]}>
                    <Link to={"reviews"} state={prevLocation}>Reviews</Link>
                </li>
            </div>
            <Outlet />
        </>
    )
};

export default MovieDetailsPage;
