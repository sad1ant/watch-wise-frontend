import React, {useEffect} from "react";
import {AppDispatch} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchInterestedMovies,
    fetchMovieRecommendations,
    fetchMovies,
    selectMovies
} from "../../redux/slices/movie-slice";
import MovieFilters from "../molecules/forms/filters/MovieFilters";
import MovieCard from "../molecules/cards/MovieCard";
import {selectAuth} from "../../redux/slices/auth-slice";
import MovieRecommendations from "../organisms/sliders/recommendations/MovieRecommendations";
import InterestedMovies from "../organisms/sliders/interested/InterestedMovies";

const Movies: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const { isAuth } = useSelector(selectAuth)
    const { movies, loading, error } = useSelector(selectMovies)

    useEffect(() => {
        dispatch(fetchMovies({ page: 0, size: 20 }))
        if (isAuth) {
            const token = localStorage.getItem('access_token')
            dispatch(fetchMovieRecommendations(token))
            dispatch(fetchInterestedMovies(token))
        }
    }, [dispatch, isAuth]);

    return (
        <div className="container mx-auto p-4 min-h-screen">
            {isAuth && (
                <div className="mb-8">
                    <MovieRecommendations />
                    <InterestedMovies />
                </div>
            )}
            <MovieFilters />
            <h1 className="text-3xl font-bold mt-8 mb-4 text-white">Фильмы</h1>
            {loading ? (
                <p>Загрузка...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {movies?.map(movie => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Movies