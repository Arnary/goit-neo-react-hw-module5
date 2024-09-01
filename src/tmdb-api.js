import axios from "axios";


const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzI3ZTQzMzU3NTQ1MGYxMjI3ZDA5OGQyYzhmZjQ2YiIsIm5iZiI6MTcyNDk2NjE5NC44NzE3NzMsInN1YiI6IjY2ZDBlMjQ5YWM1MmUzMTkyZmIxMzYyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9TOh_hggfq-8vVq-7fMU30QUuRkgzgABKglNrkV0124";

const headers = {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
};
const params = {
    include_adult: false,
    language: "en-US",
    page: 1,
};

export const fetchDailyTrends = async () => {
    const response = await axios.get("https://api.themoviedb.org/3/trending/movie/day", {
        headers,
        params,
    })
    return response.data;
};

export const fetchMoviesByKeyword = async (query) => {
    const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
        headers,
        params: { ...params, query },
    })
    return response.data;
};

export const fetchMovieDetail = async (movieId) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        headers,
        params: {
            language: "en-US",
        },
    })
    return response.data;
};

export const fetchCastDetail = async (movieId) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        headers,
        params: {
            language: "en-US",
        },
    })
    return response.data;
};

export const fetchMovieReviews = async (movieId) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
        headers,
        params: {
            language: "en-US",
            page: 1,
        },
    })
    return response.data;
};
