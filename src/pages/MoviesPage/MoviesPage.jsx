import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMoviesByKeyword } from "../../tmdb-api";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (!query) {
            return;
        };
        async function fetchMovies() {
            try {
                const response = await fetchMoviesByKeyword(query);
                setMovies(response.results);
            } catch (error) {
                console.log(error);
            }
        };
        fetchMovies();
    }, [query]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const searchInput = form.elements.searchInput.value.trim();
        if (searchInput === "") {
            toast("Enter a query in the search field.", {
                style: {
                    border: '1px solid black',
                    padding: '16px',
                    background: '#b9e2fa'
                },
                icon: "⚠︎",
                position: "top-right"
            });
            return;
        }
        setSearchParams({ query: searchInput });
        form.reset();
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={css.wrapper}>
                    <input
                        className={css["search-input"]}
                        type="text"
                        name="searchInput"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search movie..."
                    />
                    <button type="submit" className={css["search-button"]}>Search</button>
                </div>
            </form>
            <MovieList movies={movies} />
        </div>
    )
};

export default MoviesPage;
