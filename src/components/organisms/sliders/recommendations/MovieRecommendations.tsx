import React, {useState} from "react";
import {useSelector} from "react-redux";
import {
    selectMovieRecommendations,
} from "../../../../redux/slices/movie-slice";
import MovieCard from "../../../molecules/cards/MovieCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";

const MovieRecommendations: React.FC = () => {
    const recommendations = useSelector(selectMovieRecommendations)
    const [currentPage, setCurrentPage] = useState(0)

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1)
    }

    const totalPages = Math.ceil((recommendations?.length || 0) / 4)

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-white">Рекомендуем вам</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {recommendations?.slice(currentPage * 4, (currentPage + 1) * 4).map(movie => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-4">
                    {currentPage > 0 && (
                        <button
                            className='text-gray-400'
                            onClick={handlePrevPage}
                            disabled={currentPage === 0}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
                        </button>
                    )}
                    {currentPage < totalPages - 1 && (
                        <button
                            className="text-gray-400"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages - 1}
                        >
                            <FontAwesomeIcon icon={faArrowRight} size="2x" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default MovieRecommendations