import React from "react";
import Rating from "../../atoms/rating/Rating";
import {Link} from "react-router-dom";

interface MovieCardProps {
    movie: {
        id: string
        title: string
        image: string
        genre: string
        rating: number
        releaseYear: number
    }
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <Link to={`/movies/${movie.id}`} className="block">
            <div className="bg-accent p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                <img src={movie.image} alt={movie.title} className="w-full h-48 object-cover mb-4 rounded-lg" />
                <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                <p className="text-gray-400">{movie.genre} | {movie.releaseYear}</p>
                <Rating rating={movie.rating} maxRating={5} />
            </div>
        </Link>
    )
}

export default MovieCard