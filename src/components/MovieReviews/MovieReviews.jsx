import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieReviews } from "../../tmdb-api";
import css from "./MovieReviews.module.css";


const MovieReviews = () => {
    const { movieId } = useParams();
    const [movieReviews, setMovieReviews] = useState([]);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const response = await fetchMovieReviews(movieId);
                setMovieReviews(response.results);
            } catch (error) {
                console.log(error);
            }
        };
        fetchReviews();
    }, [movieId]);

    return (
        <>
            {movieReviews.length > 0 ? (
                <ul className={css["review-list"]}>
                    {movieReviews.map((review) => (
                        <li key={review.id}>
                            <p className={css["review-author"]}>Author: {review.author}</p>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>We don't have any reviews for this movie.</p>
            )}
        </>
    );
};

export default MovieReviews;
