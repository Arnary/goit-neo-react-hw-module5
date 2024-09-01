import { useEffect, useState } from "react";
import { fetchDailyTrends } from "../../tmdb-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";


const HomePage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchTrends() {
            try {
                const response = await fetchDailyTrends();
                setMovies(response.results);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTrends();
    }, []);

    return (
        <div>
            <h1 className={css.title}>Trending today</h1>
            <MovieList movies={movies} />
        </div>
    )
};

export default HomePage;
